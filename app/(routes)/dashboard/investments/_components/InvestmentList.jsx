'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function InvestmentList({ investments, onEdit, onDelete, onUpdatePrice }) {
  const [editingPrice, setEditingPrice] = React.useState({});
  
  const handlePriceChange = (id, value) => {
    setEditingPrice({ ...editingPrice, [id]: value });
  };
  
  const savePrice = (id) => {
    onUpdatePrice(id, editingPrice[id]);
    const newEditingPrice = { ...editingPrice };
    delete newEditingPrice[id];
    setEditingPrice(newEditingPrice);
  };
  
  const calculateReturn = (investment) => {
    const currentValue = investment.currentPrice * investment.quantity;
    const initialValue = investment.purchasePrice * investment.quantity;
    const returnValue = currentValue - initialValue;
    const returnPercentage = (returnValue / initialValue) * 100;
    
    return {
      value: returnValue.toFixed(2),
      percentage: returnPercentage.toFixed(2)
    };
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 text-left">Name</th>
            <th className="py-2 px-4 text-left">Ticker</th>
            <th className="py-2 px-4 text-left">Type</th>
            <th className="py-2 px-4 text-right">Purchase Price</th>
            <th className="py-2 px-4 text-right">Current Price</th>
            <th className="py-2 px-4 text-right">Quantity</th>
            <th className="py-2 px-4 text-right">Value</th>
            <th className="py-2 px-4 text-right">Return</th>
            <th className="py-2 px-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {investments.length > 0 ? (
            investments.map((investment) => {
              const returnData = calculateReturn(investment);
              const isPositiveReturn = parseFloat(returnData.value) >= 0;
              
              return (
                <tr key={investment.id} className="border-t">
                  <td className="py-3 px-4">{investment.name}</td>
                  <td className="py-3 px-4">{investment.ticker || '—'}</td>
                  <td className="py-3 px-4">{investment.assetType}</td>
                  <td className="py-3 px-4 text-right">${parseFloat(investment.purchasePrice).toFixed(2)}</td>
                  <td className="py-3 px-4 text-right">
                    {editingPrice[investment.id] !== undefined ? (
                      <div className="flex items-center space-x-1">
                        <Input 
                          type="number" 
                          value={editingPrice[investment.id]} 
                          onChange={(e) => handlePriceChange(investment.id, e.target.value)}
                          className="w-20 py-1"
                          step="0.01"
                        />
                        <Button 
                          onClick={() => savePrice(investment.id)}
                          size="sm"
                          className="py-1"
                        >
                          Save
                        </Button>
                      </div>
                    ) : (
                      <span 
                        className="cursor-pointer hover:underline" 
                        onClick={() => handlePriceChange(investment.id, investment.currentPrice)}
                      >
                        ${parseFloat(investment.currentPrice).toFixed(2)}
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">{parseFloat(investment.quantity).toFixed(2)}</td>
                  <td className="py-3 px-4 text-right">${(parseFloat(investment.currentPrice) * parseFloat(investment.quantity)).toFixed(2)}</td>
                  <td className={`py-3 px-4 text-right ${isPositiveReturn ? 'text-green-600' : 'text-red-600'}`}>
                    ${returnData.value} ({returnData.percentage}%)
                  </td>
                  <td className="py-3 px-4 flex flex-wrap justify-center gap-2">
                    <Button
                      onClick={() => onEdit(investment)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white py-1 px-3 rounded-md text-sm"
                    >
                      ✏️ Edit
                    </Button>
                    <Button
                      onClick={() => {
                        if (confirm('Are you sure you want to delete this investment?')) {
                          onDelete(investment.id);
                        }
                      }}
                      className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md text-sm"
                    >
                      🗑️ Delete
                    </Button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="9" className="text-center py-6 text-gray-500">
                No investments recorded yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}