'use client';

import React, { useState, useEffect } from 'react';
import { db } from '@/utils/dbConfig';
import { Debts } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import DebtList from './_components/DebtList';
import CreateDebt from './_components/CreateDebt';
import { Button } from '@/components/ui/button';
import { eq, desc } from 'drizzle-orm';

export default function DebtsPage() {
  const { user } = useUser();
  const [debts, setDebts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    debtType: 'owedToYou',
    dueDate: '',
    note: '',
    status: 'Unpaid',
  });
  // Add a refreshKey state to force re-renders
  const [refreshKey, setRefreshKey] = useState(0);

  // Fetch debts from the database
  const fetchDebts = async () => {
    if (!user?.emailAddresses?.[0]?.emailAddress) return;
    try {
      const userEmail = user.emailAddresses[0].emailAddress;
      const result = await db
        .select()
        .from(Debts)
        .where(eq(Debts.userEmail, userEmail))
        .orderBy(desc(Debts.createdAt));
      setDebts(result);
    } catch (error) {
      console.error("Error fetching debts:", error);
    }
  };

  // Handle editing a debt
  const handleEdit = (debt) => {
    setFormData({
      ...debt,
      // Format date for input if it exists
      dueDate: debt.dueDate ? new Date(debt.dueDate).toISOString().split('T')[0] : '',
    });
    setEditId(debt.id);
    setIsModalOpen(true);
  };

  // Handle deleting a debt
  const handleDelete = async (id) => {
    if (!id) return;
    try {
      await db.delete(Debts).where(eq(Debts.id, id));
      // Force refresh
      setRefreshKey(prevKey => prevKey + 1);
      await fetchDebts();
    } catch (error) {
      console.error("Error deleting debt:", error);
    }
  };

  // Handle toggling paid status
  const handleTogglePaid = async (id, currentStatus) => {
    if (!id) return;
    try {
      const newStatus = currentStatus === 'Paid' ? 'Unpaid' : 'Paid';
      await db.update(Debts)
        .set({ status: newStatus })
        .where(eq(Debts.id, id));
      // Force refresh
      setRefreshKey(prevKey => prevKey + 1);
      await fetchDebts();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // Handle submitting the form (either add or edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const userEmail = user?.emailAddresses?.[0]?.emailAddress;
    if (!userEmail) return;
    
    try {
      if (editId !== null) {
        // Update existing debt
        await db.update(Debts).set({
          name: formData.name,
          amount: parseFloat(formData.amount),
          debtType: formData.debtType,
          dueDate: formData.dueDate ? new Date(formData.dueDate) : null,
          note: formData.note,
          status: formData.status
        }).where(eq(Debts.id, editId));
      } else {
        // Create new debt - remove ID generation and let the database handle it
        await db.insert(Debts).values({
          userEmail,
          name: formData.name,
          amount: parseFloat(formData.amount),
          debtType: formData.debtType,
          dueDate: formData.dueDate ? new Date(formData.dueDate) : null,
          note: formData.note,
          status: formData.status,
          createdAt: new Date()
        });
      }
      
      // Reset form and close modal
      setIsModalOpen(false);
      setFormData({
        name: '',
        amount: '',
        debtType: 'owedToYou',
        dueDate: '',
        note: '',
        status: 'Unpaid',
      });
      setEditId(null);
      
      // Force refresh and fetch debts
      setRefreshKey(prevKey => prevKey + 1);
      await fetchDebts();
    } catch (error) {
      console.error("Error saving debt:", error);
    }
  };

  // Open the modal for creating a new debt
  const handleOpenModal = () => setIsModalOpen(true);

  // Close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({
      name: '',
      amount: '',
      debtType: 'owedToYou',
      dueDate: '',
      note: '',
      status: 'Unpaid',
    });
    setEditId(null);
  };

  useEffect(() => {
    if (user) {
      fetchDebts();
    }
  }, [user, refreshKey]); // Add refreshKey to dependencies

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Debt Tracking</h1>
      <div className="flex justify-end mb-4">
        <Button onClick={handleOpenModal}>Add New Debt</Button>
      </div>
      <DebtList 
        debts={debts} 
        onEdit={handleEdit} 
        onDelete={handleDelete}
        onTogglePaid={handleTogglePaid}
      />
      {isModalOpen && (
        <CreateDebt
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