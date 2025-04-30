'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import DebtTable from "./_components/DebtTable";
import EditDebtModal from "./_components/EditDebtModal";

function DebtsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [debts, setDebts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    debtType: 'owedToYou',
    dueDate: '',
    note: '',
    status: 'Unpaid',
  });
  useEffect(() => {
    const fetchDebts = async () => {
      const res = await fetch('/api/debts/all');
      const data = await res.json();
      setDebts(data);
    };
    fetchDebts();
  }, []);
  
  const [editId, setEditId] = useState(null);

  const handleOpenModal = () => setIsModalOpen(true);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/debts', {
        method: editId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, id: editId }),
      });
  
      if (!res.ok) throw new Error('Failed to save debt');
  
      const saved = await res.json();
      if (editId !== null) {
        setDebts(prev => prev.map((d) => d.id === saved.id ? saved : d));
      } else {
        setDebts(prev => [...prev, saved]);
      }
  
      handleCloseModal();
    } catch (err) {
      console.error(err);
      alert('Error saving debt');
    }
  };
  
  const handleEdit = (debt) => {
    setFormData({
      name: debt.name,
      amount: debt.amount,
      debtType: debt.debtType,
      dueDate: debt.dueDate,
      note: debt.note,
      status: debt.status,
    });
    setEditId(debt.id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    await fetch('/api/debts', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    setDebts(prev => prev.filter(d => d.id !== id));
  };
  

  const handleTogglePaid = async (id) => {
    const debt = debts.find(d => d.id === id);
    const updatedStatus = debt.status === 'Paid' ? 'Unpaid' : 'Paid';
  
    const res = await fetch('/api/debts', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...debt, status: updatedStatus }),
    });
  
    const updated = await res.json();
    setDebts(prev => prev.map(d => d.id === id ? updated : d));
  };
  

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Debt Tracking</h1>

      <div className="flex justify-end mb-4">
        <Button onClick={handleOpenModal} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow">
          Add New Debt
        </Button>
      </div>

      <DebtTable debts={debts} handleEdit={handleEdit} handleDelete={handleDelete} handleTogglePaid={handleTogglePaid} />
      <EditDebtModal isModalOpen={isModalOpen} handleCloseModal={handleCloseModal} formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} editId={editId} />
    </div>
  );
}

export default DebtsPage;
