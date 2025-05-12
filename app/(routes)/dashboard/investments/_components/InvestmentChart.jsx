'use client';

import React from 'react';

export default function InvestmentChart({ investments }) {
  // Group investments by asset type for allocation chart
  const assetAllocation = investments.reduce((acc, investment) => {
    const value = parseFloat(investment.currentPrice) * parseFloat(investment.quantity);
    const type = investment.assetType;
    
    if (!acc[type]) {
      acc[type] = 0;
    }
    
    acc[type] += value;
    return acc;
  }, {});
  
  // Calculate total value to get percentages
  const totalValue = Object.values(assetAllocation).reduce((sum, value) => sum + value, 0);
  
  // Convert to percentage and prepare data for visualization
  const allocationData = Object.entries(assetAllocation).map(([type, value]) => ({
    type,
    value,
    percentage: totalValue > 0 ? ((value / totalValue) * 100).toFixed(1) : 0
  }));
  
  return (
    <div className="flex flex-col h-full">
      <p className="text-center text-lg font-medium mb-4">Asset Allocation</p>
      
      {/* Simple bar chart visualization */}
      <div className="flex h-6 w-full rounded-md overflow-hidden mb-4">
        {allocationData.map((data, index) => (
          <div 
            key={data.type}
            className={`h-full ${getColorByIndex(index)}`} 
            style={{ width: `${data.percentage}%` }} 
            title={`${data.type}: ${data.percentage}%`}
          />
        ))}
      </div>
      
      {/* Legend */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {allocationData.map((data, index) => (
          <div key={data.type} className="flex items-center">
            <div className={`w-4 h-4 mr-2 ${getColorByIndex(index)}`} />
            <span className="text-sm">
              {data.type}: {data.percentage}% (${data.value.toFixed(2)})
            </span>
          </div>
        ))}
      </div>
      
      {/* Show message when no data */}
      {investments.length === 0 && (
        <p className="text-center text-gray-500 my-auto">
          No investment data to display. Add investments to see your portfolio allocation.
        </p>
      )}
    </div>
  );
}

// Helper function to get colors for chart segments
function getColorByIndex(index) {
  const colors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-red-500',
    'bg-indigo-500',
    'bg-pink-500',
    'bg-teal-500'
  ];
  
  return colors[index % colors.length];
}