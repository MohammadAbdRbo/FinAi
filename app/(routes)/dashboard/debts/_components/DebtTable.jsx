'use client';
import { Button } from "@/components/ui/button";

export default function DebtTable({ debts, handleEdit, handleDelete, handleTogglePaid }) {
  return (
    <div className="overflow-x-auto shadow rounded-lg mb-8">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Amount</th>
            <th className="py-2 px-4">Due Date</th>
            <th className="py-2 px-4">Status</th>
            <th className="py-2 px-4">Notes</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {debts.length > 0 ? (
            debts.map((debt) => (
              <tr key={debt.id} className="border-t">
                <td className="py-3 px-4 text-center">{debt.name}</td>
                <td className="py-3 px-4 text-center">${debt.amount}</td>
                <td className="py-3 px-4 text-center">{debt.dueDate ? new Date(debt.dueDate).toLocaleDateString() : '—'}</td>
                <td className="py-3 px-4 text-center">
                  <span className={`px-2 py-1 rounded-full text-xs ${debt.status === 'Paid' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                    {debt.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-center">{debt.note || '—'}</td>
                <td className="py-3 px-4 flex flex-wrap justify-center gap-2">
                  <Button onClick={() => handleEdit(debt)} className="bg-yellow-400 hover:bg-yellow-500 text-white py-1 px-3 rounded-md text-sm">
                    ✏️ Edit
                  </Button>
                  <Button onClick={() => { if (confirm('Are you sure you want to delete this debt?')) { handleDelete(debt.id); } }}
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md text-sm">
                    🗑️ Delete
                  </Button>
                  <Button onClick={() => handleTogglePaid(debt.id)}
                    className={`py-1 px-3 rounded-md text-sm ${debt.status === 'Paid' ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-gray-400 hover:bg-gray-500 text-white'}`}>
                    {debt.status === 'Paid' ? '✅ Unpaid' : '💸 Paid'}
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-6 text-gray-500">
                No debts recorded yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
