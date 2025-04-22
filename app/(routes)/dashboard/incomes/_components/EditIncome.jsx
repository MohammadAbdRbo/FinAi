"use client";
import { Button } from "@/components/ui/button";
import { PenBox } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EmojiPicker from "emoji-picker-react";
import { useUser } from "@clerk/nextjs";
import { Input } from "@/components/ui/input";
import { db } from "@/utils/dbConfig";
import { Incomes } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { toast } from "sonner";

function EditIncome({ IncomeInfo, refreshData }) {
  const [emojiIcon, setEmojiIcon] = useState("💰");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const { user } = useUser();

  useEffect(() => {
    if (IncomeInfo) {
      setEmojiIcon(IncomeInfo.icon || "💰");
      setAmount(IncomeInfo.amount?.toString() || "");
      setName(IncomeInfo.name || "");
    }
  }, [IncomeInfo]);

  const onUpdateIncome = async () => {
    if (!name || !amount) return;

    const result = await db
      .update(Incomes)
      .set({
        name,
        amount: parseFloat(amount),
        icon: emojiIcon,
      })
      .where(eq(Incomes.id, IncomeInfo.id))
      .returning();

    if (result) {
      refreshData();
      toast("Income Updated!");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex space-x-2 gap-2 rounded-full">
          <PenBox className="w-4" /> Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Income</DialogTitle>
          <DialogDescription>
            <div className="mt-5">
              <Button
                variant="outline"
                className="text-lg"
                onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
              >
                {emojiIcon}
              </Button>
              {openEmojiPicker && (
                <div className="absolute z-20 mt-2">
                  <EmojiPicker
                    onEmojiClick={(e) => {
                      setEmojiIcon(e.emoji);
                      setOpenEmojiPicker(false);
                    }}
                  />
                </div>
              )}
              <div className="mt-4">
                <h2 className="text-black font-medium mb-1">Income Name</h2>
                <Input
                  placeholder="e.g. Freelance Work"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mt-4">
                <h2 className="text-black font-medium mb-1">Income Amount</h2>
                <Input
                  type="number"
                  placeholder="e.g. 5000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button
              disabled={!name || !amount}
              onClick={onUpdateIncome}
              className="mt-5 w-full rounded-full"
            >
              Update Income
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditIncome;
