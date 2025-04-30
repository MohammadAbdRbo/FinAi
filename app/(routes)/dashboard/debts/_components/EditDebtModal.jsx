'use client';
import { Button } from "@/components/ui/button";
import DebtForm from './AddDebtForm';

export default function EditDebtModal({ isModalOpen, handleCloseModal, formData, handleChange, handleSubmit, editId }) {
  if (!isModalOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <h2 className="text-2xl font-bold mb-6 text-center">{editId !== null ? 'Edit Debt' : 'Add New Debt'}</h2>
        <DebtForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleCloseModal={handleCloseModal}
          editId={editId}
        />
        <Button onClick={handleCloseModal} className="absolute top-3 right-3 white-500 hover:text-gray-700">
          ✖
        </Button>
      </div>
    </div>
  );
}
