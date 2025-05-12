'use client';

import React, { useState, useEffect } from 'react';
import { db } from '@/utils/dbConfig';
import { Investments } from '@/utils/schema'; // You'll need to create this schema
import { useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { eq, desc } from 'drizzle-orm';
import InvestmentChart from './_components/InvestmentChart';
import InvestmentList from './_components/InvestmentList';
import CreateInvestment from './_components/CreateInvestment';

export default function InvestmentsPage() {
  const { user } = useUser();
  const [investments, setInvestments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [portfolioSummary, setPortfolioSummary] = useState({
    totalValue: 0,
    totalReturn: 0,
    returnPercentage: 0,
    assetAllocation: {}
  });
  const [formData, setFormData] = useState({
    name: '',
    ticker: '',
    assetType: 'stock',
    purchaseDate: '',
    purchasePrice: '',
    quantity: '',
    currentPrice: '',
    notes: '',
  });

  // Fetch investments from database
  const fetchInvestments = async () => {
    if (!user?.emailAddresses?.[0]?.emailAddress) return;
    try {
      const userEmail = user.emailAddresses[0].emailAddress;
      const result = await db
        .select()
        .from(Investments)
        .where(eq(Investments.userEmail, userEmail))
        .orderBy(desc(Investments.purchaseDate));
      setInvestments(result);
      calculatePortfolioSummary(result);
    } catch (error) {
      console.error("Error fetching investments:", error);
    }
  };

  // Calculate portfolio summary metrics
  const calculatePortfolioSummary = (investments) => {
    let totalCurrentValue = 0;
    let totalInvested = 0;
    const assetAllocation = {};

    investments.forEach(investment => {
      const currentValue = investment.currentPrice * investment.quantity;
      const invested = investment.purchasePrice * investment.quantity;
      
      totalCurrentValue += currentValue;
      totalInvested += invested;
      
      // Calculate asset allocation
      if (assetAllocation[investment.assetType]) {
        assetAllocation[investment.assetType] += currentValue;
      } else {
        assetAllocation[investment.assetType] = currentValue;
      }
    });

    // Convert asset allocation to percentages
    Object.keys(assetAllocation).forEach(key => {
      assetAllocation[key] = (assetAllocation[key] / totalCurrentValue) * 100;
    });

    const totalReturn = totalCurrentValue - totalInvested;
    const returnPercentage = totalInvested > 0 ? (totalReturn / totalInvested) * 100 : 0;

    setPortfolioSummary({
      totalValue: totalCurrentValue.toFixed(2),
      totalReturn: totalReturn.toFixed(2),
      returnPercentage: returnPercentage.toFixed(2),
      assetAllocation
    });
  };

  // Handle editing an investment
  const handleEdit = (investment) => {
    setFormData({
      ...investment,
      purchaseDate: investment.purchaseDate ? new Date(investment.purchaseDate).toISOString().split('T')[0] : '',
    });
    setEditId(investment.id);
    setIsModalOpen(true);
  };

  // Handle deleting an investment
  const handleDelete = async (id) => {
    if (!id) return;
    try {
      await db.delete(Investments).where(eq(Investments.id, id));
      setRefreshKey(prevKey => prevKey + 1);
      await fetchInvestments();
    } catch (error) {
      console.error("Error deleting investment:", error);
    }
  };

  // Handle updating current price
  const handleUpdatePrice = async (id, newPrice) => {
    if (!id) return;
    try {
      await db.update(Investments)
        .set({ currentPrice: parseFloat(newPrice) })
        .where(eq(Investments.id, id));
      setRefreshKey(prevKey => prevKey + 1);
      await fetchInvestments();
    } catch (error) {
      console.error("Error updating price:", error);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const userEmail = user?.emailAddresses?.[0]?.emailAddress;
    if (!userEmail) return;
    
    try {
      const investmentData = {
        name: formData.name,
        ticker: formData.ticker,
        assetType: formData.assetType,
        purchaseDate: formData.purchaseDate ? new Date(formData.purchaseDate) : null,
        purchasePrice: parseFloat(formData.purchasePrice),
        quantity: parseFloat(formData.quantity),
        currentPrice: parseFloat(formData.currentPrice || formData.purchasePrice),
        notes: formData.notes
      };

      if (editId !== null) {
        // Update existing investment
        await db.update(Investments)
          .set(investmentData)
          .where(eq(Investments.id, editId));
      } else {
        // Create new investment
        await db.insert(Investments).values({
          ...investmentData,
          userEmail,
          createdAt: new Date()
        });
      }
      
      // Reset and refresh
      setIsModalOpen(false);
      resetForm();
      setRefreshKey(prevKey => prevKey + 1);
      await fetchInvestments();
    } catch (error) {
      console.error("Error saving investment:", error);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      ticker: '',
      assetType: 'stock',
      purchaseDate: '',
      purchasePrice: '',
      quantity: '',
      currentPrice: '',
      notes: '',
    });
    setEditId(null);
  };

  // Open/close modal
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  useEffect(() => {
    if (user) {
      fetchInvestments();
    }
  }, [user, refreshKey]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Investment Portfolio</h1>
      
      {/* Portfolio Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-gray-500">Portfolio Value</p>
          <p className="text-2xl font-bold">${portfolioSummary.totalValue}</p>
        </div>
        <div className={`bg-white p-4 rounded-lg shadow ${parseFloat(portfolioSummary.totalReturn) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          <p className="text-gray-500">Total Return</p>
          <p className="text-2xl font-bold">
            ${portfolioSummary.totalReturn} ({portfolioSummary.returnPercentage}%)
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-gray-500">Number of Assets</p>
          <p className="text-2xl font-bold">{investments.length}</p>
        </div>
      </div>
      
      {/* Chart Section */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <h2 className="text-xl font-semibold mb-4">Portfolio Performance</h2>
        <div className="h-64">
          <InvestmentChart investments={investments} />
        </div>
      </div>
      
      {/* Investments Table with Add Button */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Your Investments</h2>
          <Button onClick={handleOpenModal}>Add Investment</Button>
        </div>
        <InvestmentList 
          investments={investments} 
          onEdit={handleEdit} 
          onDelete={handleDelete}
          onUpdatePrice={handleUpdatePrice}
        />
      </div>
      
      {/* Investment Form Modal */}
      {isModalOpen && (
        <CreateInvestment
          formData={formData}
          onChange={setFormData}
          onSubmit={handleSubmit}
          onClose={handleCloseModal}
          editId={editId}
        />
      )}
    </div>
  );
}