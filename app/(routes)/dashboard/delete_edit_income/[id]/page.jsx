"use client";
import { db } from "@/utils/dbConfig";
import { Incomes } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Pen, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import EditIncome from "../_components/EditIncome";
import IncomeItem from "../../incomes/_components/IncomeItem";

function IncomesScreen({ params }) {
  const { user } = useUser();
  const [budget, setBudget] = useState();
  const router = useRouter();

  useEffect(() => {
    user && getIncomeInfo();
  }, [user]);

  const getIncomeInfo = async () => {
    if (!params?.id || isNaN(Number(params.id))) {
      console.error("Invalid or missing ID");
      return;
    }

    const result = await db
      .select()
      .from(Incomes)
      .where(eq(Incomes.id, Number(params.id)))
      .then((res) => res[0]);

    setBudget(result);
  };

  const deleteIncome = async () => {
    if (!params?.id || isNaN(Number(params.id))) {
      console.error("Invalid or missing ID for deletion");
      return;
    }

    await db
      .delete(Incomes)
      .where(eq(Incomes.id, Number(params.id)))
      .returning();

    toast("Income Deleted!");
    router.replace("/dashboard/incomes");
  };

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold gap-2 flex justify-between items-center">
        <span className="flex gap-2 items-center">
          <ArrowLeft onClick={() => router.back()} className="cursor-pointer" />
          My Income
        </span>
        <div className="flex gap-2 items-center">
          {budget && (
            <EditIncome
              incomeInfo={budget}
              refreshData={getIncomeInfo}
              trigger={
                <Button className="rounded-full px-3 flex gap-2 items-center">
                  <Pen className="w-4" /> Edit
                </Button>
              }
            />
          )}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="flex gap-2 rounded-full" variant="destructive">
                <Trash className="w-4" /> Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete this income record from our database.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={deleteIncome}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </h2>

      <div className="mt-6">
        {budget ? (
          <IncomeItem budget={budget} />
        ) : (
          <div className="h-[150px] w-full bg-slate-200 rounded-lg animate-pulse"></div>
        )}
      </div>
    </div>
  );
}

export default IncomesScreen;
