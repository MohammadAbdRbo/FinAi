import { db } from "@/utils/dbConfig";
import { Debts } from "@/utils/schema";
import { NextResponse } from "next/server";

export async function GET() {
  const debts = await db.select().from(Debts);
  return NextResponse.json(debts);
}
