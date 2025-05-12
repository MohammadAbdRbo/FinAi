'use client'

import React from 'react'
import { useUser } from '@clerk/nextjs'
import DebtItem from './DebtItem'

export default function DebtList({ debts, onEdit, onDelete, onTogglePaid }) {
  const { user } = useUser()

  return (
    <div className="overflow-x-auto shadow rounded-lg mb-8">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Amount</th>
            <th className="py-2 px-4">Due Date</th>
            <th className="py-2 px-4">Status</th>
            <th className="py-2 px-4">Note</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {debts.length > 0 ? (
            debts.map((debt) => (
              <DebtItem
                key={debt.id}
                debt={debt}
                onEdit={onEdit}
                onDelete={onDelete}
                onTogglePaid={onTogglePaid}
              />
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
  )
}