import Link from "next/link";
import React from "react";

function IncomeItem({ budget }) {
  const calculateProgressPerc = () => {
    const perc = (budget.totalSpend / budget.amount) * 100;
    return perc > 100 ? 100 : perc.toFixed(2);
  };
  return (
    <Link href={"/dashboard/delete_edit_income/" + budget?.id}>
      <div
        className="p-5 border rounded-2xl
      hover:shadow-md cursor-pointer h-[170px]"
      >
        <div className="flex gap-2 items-center justify-between">
          <div className="flex gap-2 items-center">
            <h2
              className="text-2xl p-3 px-4
                bg-slate-100 rounded-full 
                "
            >
              {budget?.icon}
            </h2>
            <div>
            <h2 className="font-bold">{budget?.name || "No Budget"}</h2>
              
            </div>
          </div>
          <h2 className="font-bold text-primary text-lg"> ₪{budget?.amount || "No Budget"}</h2>
        </div>
      </div>
    </Link>
  );
}

export default IncomeItem;
