"use client";
import { db } from "@/utils/dbConfig";
import { Incomes } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { eq, getTableColumns } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import IncomeItem from "../IncomeItem";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Trash } from "lucide-react";
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
import EditIncome from "../EditIncome";

function IncomeScreen({ params }) {
  const { user } = useUser();
  const [IncomeInfo, setIncomeInfo] = useState();
  const router = useRouter();

  useEffect(() => {
    user && getIncomeInfo();
  }, [user]);

  const getIncomeInfo = async () => {
    const result = await db
      .select(getTableColumns(Incomes))
      .from(Incomes)
      .where(eq(Incomes.createdBy, user?.primaryEmailAddress?.emailAddress))
      .where(eq(Incomes.id, params.id));
    setIncomeInfo(result[0]);
  };

  const deleteIncome = async () => {
    await db.delete(Incomes).where(eq(Incomes.id, params.id));
    toast("Income Deleted!");
    router.replace("/dashboard/Incomes");
  };

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold gap-2 flex justify-between items-center">
        <span className="flex gap-2 items-center">
          <ArrowLeft onClick={() => router.back()} className="cursor-pointer" />
          My Income
        </span>
        <div className="flex gap-2 items-center">
          <EditIncome
            IncomeInfo={IncomeInfo}
            refreshData={() => getIncomeInfo()}
          />
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
                  This will delete your current Income and remove your data.
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
        {IncomeInfo ? (
          <IncomeItem budget={IncomeInfo} />
        ) : (
          <div className="h-[150px] w-full bg-slate-200 rounded-lg animate-pulse" />
        )}
      </div>
    </div>
  );
}

export default IncomeScreen;
