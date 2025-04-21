
export function calculateBudgetTotals(budgetList = [], incomeList = []) {
    let totalBudget = 0;
    let totalSpend = 0;
    let totalIncome = 0;
  
    budgetList.forEach((item) => {
      totalBudget += Number(item.amount);
      totalSpend += item.totalSpend;
    });
  
    incomeList.forEach((item) => {
      totalIncome += item.totalAmount;
    });
  
    return {
      totalBudget,
      totalSpend,
      totalIncome,
    };
  }
  