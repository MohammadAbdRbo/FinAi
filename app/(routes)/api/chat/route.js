import { OpenAI } from "openai";
import { db } from "@/utils/dbConfig"; // المسار حسب تنظيم مشروعك
import { Budgets, Incomes, Expenses, Debts, Investments } from "@/utils/schema"; // تأكد من المسارات

import { eq } from "drizzle-orm";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const { message, totalBudget, totalSpend, totalIncome, userEmail } = await req.json();

    if (!userEmail) {
      return new Response(JSON.stringify({ advice: "User email is missing." }), { status: 400 });
    }

    // 🧠 استرجاع بيانات المستخدم من القاعدة
    const [budgets, incomes, expenses, debts, investments] = await Promise.all([
      db.select().from(Budgets).where(eq(Budgets.createdBy, userEmail)),
      db.select().from(Incomes).where(eq(Incomes.createdBy, userEmail)),
      db.select().from(Expenses).where(eq(Expenses.createdAt, userEmail)),
      db.select().from(Debts).where(eq(Debts.userEmail, userEmail)),
      db.select().from(Investments).where(eq(Investments.userEmail, userEmail)),
    ]);

    // 🔍 تحديد اللغة
    const msgLower = message.toLowerCase();
    let lang = "English";
    if (msgLower.includes("عربي") || msgLower.includes("العربية")) lang = "Arabic";
    else if (msgLower.includes("עברית") || msgLower.includes("עיברית") || msgLower.includes("بالعبرية")) lang = "Hebrew";

    // 💬 بناء البرومبت
    const systemPrompt = `
You are a helpful financial assistant. You must respond ONLY in ${lang}.
If the user asks something unrelated to personal finance, redirect them back.
Only answer in Arabic, Hebrew, or English.

User's Financial Summary:
- Monthly budget: ${totalBudget || "unknown"}
- Monthly income: ${totalIncome || "unknown"}
- Monthly spending: ${totalSpend || "unknown"}

Budgets: ${budgets.length > 0 ? JSON.stringify(budgets) : "No budgets found"}
Incomes: ${incomes.length > 0 ? JSON.stringify(incomes) : "No incomes found"}
Expenses: ${expenses.length > 0 ? JSON.stringify(expenses) : "No expenses found"}
Debts: ${debts.length > 0 ? JSON.stringify(debts) : "No debts found"}
Investments: ${investments.length > 0 ? JSON.stringify(investments) : "No investments found"}

Use this information to give personalized financial advice.
`;

    // 🔥 إرسال الطلب إلى OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
    });

    const advice = completion.choices[0].message.content;

    return new Response(JSON.stringify({ advice }), { status: 200 });

  } catch (error) {
    console.error("API error:", error);
    return new Response(
      JSON.stringify({ advice: "حدث خطأ أثناء المعالجة. حاول مجددًا لاحقًا." }),
      { status: 500 }
    );
  }
}
