"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { toast } from "sonner";

export default function DebtForm({ formData, setFormData, handleSubmit, handleCloseModal, editId }) {
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form className="space-y-4" onSubmit={(e) => {
      e.preventDefault();
      handleSubmit();
    }}>
      <div>
        <label className="block text-gray-700">Person's Name</label>
        <Input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">Amount</label>
        <Input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">Debt Type</label>
        <select
          name="debtType"
          value={formData.debtType}
          onChange={handleChange}
          className="w-full border rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        >
          <option value="">Select Type</option>
          <option value="owedToYou">Owed to You</option>
          <option value="youOwe">You Owe</option>
        </select>
      </div>
      <div>
        <label className="block text-gray-700">Due Date</label>
        <Input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">Note (Optional)</label>
        <textarea
          name="note"
          value={formData.note}
          onChange={handleChange}
          className="w-full border rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Add any notes..."
        />
      </div>
      <div>
        <label className="block text-gray-700">Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full border rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        >
          <option value="Unpaid">Unpaid</option>
          <option value="Paid">Paid</option>
        </select>
      </div>
      <div className="flex justify-end space-x-2">
        <Button
          type="button"
          onClick={handleCloseModal}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-lg"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
        >
          {loading ? "Saving..." : (editId !== null ? "Update" : "Save")}
        </Button>
      </div>
    </form>
  );
}
