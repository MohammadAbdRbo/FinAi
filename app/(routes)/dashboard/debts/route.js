import { db } from "@/utils/dbConfig";
import { Debts } from "@/utils/schema";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const [newDebt] = await db.insert(Debts).values(body).returning();
  return NextResponse.json(newDebt);
}

export async function PUT(req) {
  const body = await req.json();
  const [updatedDebt] = await db.update(Debts).set(body).where(Debts.id.eq(body.id)).returning();
  return NextResponse.json(updatedDebt);
}

export async function DELETE(req) {
  const { id } = await req.json();
  await db.delete(Debts).where(Debts.id.eq(id));
  return NextResponse.json({ success: true });
}
