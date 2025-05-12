'use client';

import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function CreateInvestment({ formData, onChange, onSubmit, onClose, editId }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...formData, [name]: value });
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{editId ? 'Edit Investment' : 'Add New Investment'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <p className="text-sm font-medium">Investment Name</p>
            <Input 
              id="name"
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              placeholder="E.g., Apple Inc., S&P 500 ETF" 
              required 
            />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">Ticker Symbol (Optional)</p>
            <Input 
              id="ticker"
              name="ticker" 
              value={formData.ticker} 
              onChange={handleChange} 
              placeholder="E.g., AAPL, VOO" 
            />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">Asset Type</p>
            <select 
              id="assetType"
              name="assetType" 
              value={formData.assetType} 
              onChange={handleChange} 
              className="w-full border rounded p-2"
              required
            >
              <option value="stock">Stock</option>
              <option value="etf">ETF</option>
              <option value="mutualFund">Mutual Fund</option>
              <option value="bond">Bond</option>
              <option value="crypto">Cryptocurrency</option>
              <option value="realEstate">Real Estate</option>
              <option value="cash">Cash / Money Market</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">Purchase Date</p>
            <Input 
              id="purchaseDate"
              type="date" 
              name="purchaseDate" 
              value={formData.purchaseDate} 
              onChange={handleChange} 
              required
            />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">Purchase Price (per unit)</p>
            <Input 
              id="purchasePrice"
              name="purchasePrice" 
              type="number" 
              step="0.01"
              value={formData.purchasePrice} 
              onChange={handleChange} 
              placeholder="0.00" 
              required 
            />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">Quantity</p>
            <Input 
              id="quantity"
              name="quantity" 
              type="number" 
              step="0.01"
              value={formData.quantity} 
              onChange={handleChange} 
              placeholder="0.00" 
              required 
            />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">Current Price (per unit)</p>
            <Input 
              id="currentPrice"
              name="currentPrice" 
              type="number" 
              step="0.01"
              value={formData.currentPrice} 
              onChange={handleChange} 
              placeholder="Same as purchase price if not specified" 
            />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">Notes (Optional)</p>
            <textarea 
              id="notes"
              name="notes" 
              value={formData.notes} 
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
              {editId ? 'Update Investment' : 'Add Investment'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}