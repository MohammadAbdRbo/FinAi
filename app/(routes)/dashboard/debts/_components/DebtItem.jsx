import React from 'react'
import { Button } from '@/components/ui/button'

export default function DebtItem({ debt, onEdit, onDelete, onTogglePaid }) {
  return (
    <tr className="border-t">
      <td className="py-3 px-4 text-center">{debt.name}</td>
      <td className="py-3 px-4 text-center">${debt.amount}</td>
      <td className="py-3 px-4 text-center">
        {debt.dueDate ? new Date(debt.dueDate).toLocaleDateString() : '—'}
      </td>
      <td className="py-3 px-4 text-center">
        <span className={`px-2 py-1 rounded-full text-xs ${
          debt.status === 'Paid'
            ? 'bg-green-200 text-green-800'
            : 'bg-red-200 text-red-800'
        }`}>
          {debt.status}
        </span>
      </td>
      <td className="py-3 px-4 text-center">{debt.note || '—'}</td>
      <td className="py-3 px-4 flex flex-wrap justify-center gap-2">
        <Button
          onClick={() => onEdit(debt)}
          className="bg-yellow-400 hover:bg-yellow-500 text-white py-1 px-3 rounded-md text-sm"
        >
          ✏️ Edit
        </Button>
        <Button
          onClick={() => {
            if (confirm('Are you sure you want to delete this debt?')) {
              onDelete(debt.id)
            }
          }}
          className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md text-sm"
        >
          🗑️ Delete
        </Button>
        <Button
          onClick={() => onTogglePaid(debt.id, debt.status)}
          className={`py-1 px-3 rounded-md text-sm ${
            debt.status === 'Paid'
              ? 'bg-green-500 hover:bg-green-600 text-white'
              : 'bg-gray-400 hover:bg-gray-500 text-white'
          }`}
        >
          {debt.status === 'Paid' ? '✅ Unpaid' : '💸 Paid'}
        </Button>
      </td>
    </tr>
  )
}
