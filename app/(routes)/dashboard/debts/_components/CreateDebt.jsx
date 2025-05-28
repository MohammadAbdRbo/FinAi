'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export default function CreateDebt({ formData, onChange, onSubmit, onClose, editId }) {
  const { user } = useUser();

  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...formData, [name]: value });
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{editId ? 'Edit Debt' : 'Create New Debt'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <p className="text-sm font-medium">Name</p>
            <Input 
              id="name"
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              placeholder="E.g., John Doe, Car Loan" 
              required 
            />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">Amount (₪)</p>
            <Input 
              id="amount"
              name="amount" 
              type="number" 
              step="0.01"
              value={formData.amount} 
              onChange={handleChange} 
              placeholder="0.00" 
              required 
            />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">Debt Type</p>
            <select 
              id="debtType"
              name="debtType" 
              value={formData.debtType} 
              onChange={handleChange} 
              className="w-full border rounded p-2"
              required
            >
              <option value="owedToYou">Owed to You</option>
              <option value="youOwe">You Owe</option>
            </select>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">Due Date</p>
            <Input 
              id="dueDate"
              type="date" 
              name="dueDate" 
              value={formData.dueDate} 
              onChange={handleChange} 
            />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">Status</p>
            <select 
              id="status"
              name="status" 
              value={formData.status} 
              onChange={handleChange} 
              className="w-full border rounded p-2"
              required
            >
              <option value="Unpaid">Unpaid</option>
              <option value="Paid">Paid</option>
            </select>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">Note (Optional)</p>
            <textarea 
              id="note"
              name="note" 
              value={formData.note} 
              onChange={handleChange} 
              placeholder="Add any additional details here"
              className="w-full border rounded p-2 min-h-20"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {editId ? 'Update' : 'Save'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}