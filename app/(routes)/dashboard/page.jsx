"use client";
import React, { useEffect, useState } from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import CardInfo from "./_components/CardInfo";
import { db } from "@/utils/dbConfig";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { Budgets, Expenses, Incomes } from "@/utils/schema";
import BarChartDashboard from "./_components/BarChartDashboard";
import BudgetItem from "./budgets/_components/BudgetItem";
import ExpenseListTable from "./expenses/_components/ExpenseListTable";
import AdvisorPage from "./aiadvisor/_components/AdvisorPage";

function Dashboard() {
  const { user } = useUser();

  const [budgetList, setBudgetList] = useState([]);
  const [incomeList, setIncomeList] = useState([]);
  const [expensesList, setExpensesList] = useState([]);

  const [totalBudget, setTotalBudget] = useState(0);
  const [totalSpend, setTotalSpend] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);

  useEffect(() => {
    user && getBudgetList();
  }, [user]);

  const getBudgetList = async () => {
    const result = await db
      .select({
        ...getTableColumns(Budgets),
        totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
        totalItem: sql`count(${Expenses.id})`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .groupBy(Budgets.id)
      .orderBy(desc(Budgets.id));
    setBudgetList(result);
    getAllExpenses();
    getIncomeList();
  };

  const getIncomeList = async () => {
    try {
      const result = await db
        .select({
          ...getTableColumns(Incomes),
          totalAmount: sql`SUM(CAST(${Incomes.amount} AS NUMERIC))`.mapWith(
            Number
          ),
        })
        .from(Incomes)
        .groupBy(Incomes.id);
      setIncomeList(result);
    } catch (error) {
      console.error("Error fetching income list:", error);
    }
  };

  const getAllExpenses = async () => {
    const result = await db
      .select({
        id: Expenses.id,
        name: Expenses.name,
        amount: Expenses.amount,
        createdAt: Expenses.createdAt,
      })
      .from(Budgets)
      .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress.emailAddress))
      .orderBy(desc(Expenses.id));
    setExpensesList(result);
  };

 return (
  <div className="p-4 md:p-6 lg:p-8 bg-gray-50">
    {/* Header Section with greeting and subtitle */}
    <div className="mb-6">
      <h2 className="font-bold text-3xl md:text-4xl text-gray-800">Hi, {user?.fullName} 👋</h2>
      <p className="text-gray-500 mt-1">Here's what's happening with your money. Let's manage your expenses.</p>
    </div>

    {/* Main Summary Cards */}
    <div className="mb-8">
      <CardInfo
        budgetList={budgetList}
        incomeList={incomeList}
        onTotalsCalculated={({ totalBudget, totalSpend, totalIncome }) => {
          setTotalBudget(totalBudget);
          setTotalSpend(totalSpend);
          setTotalIncome(totalIncome);
        }}
      />
    </div>

    {/* Main Content Grid */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column - Charts and Tables */}
      <div className="lg:col-span-2 space-y-6">
        {/* Bar Chart */}
        <div className="bg-white rounded-xl shadow-sm p-4">
          <BarChartDashboard budgetList={budgetList} />
        </div>
        
        {/* Financial Advisor Section */}
        <div className="bg-white rounded-xl shadow-sm p-4">
          <AdvisorPage
            totalBudget={totalBudget}
            totalSpend={totalSpend}
            totalIncome={totalIncome}
          />
        </div>
        
        {/* Expenses Table */}
        <div className="bg-white rounded-xl shadow-sm p-4">
          <ExpenseListTable
            expensesList={expensesList}
            refreshData={() => getBudgetList()}
          />
        </div>
      </div>

      {/* Right Column - Budget List */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <h2 className="font-bold text-lg mb-4 text-gray-800">Latest Budgets</h2>
        <div className="space-y-4">
          {budgetList?.length > 0
            ? budgetList.map((budget, index) => (
                <BudgetItem budget={budget} key={index} />
              ))
            : [1, 2, 3, 4, 5, 6, 7].map((item, index) => (
                <div
                  key={index}
                  className="h-24 w-full bg-gray-100 rounded-lg animate-pulse"
                ></div>
              ))}
        </div>
      </div>
    </div>
  </div>
);
}

export default Dashboard;
