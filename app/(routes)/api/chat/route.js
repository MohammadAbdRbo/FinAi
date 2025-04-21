import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const { message, totalBudget, totalSpend, totalIncome } = await req.json();

    // Detect language preference
    const msgLower = message.toLowerCase();
    let lang = "English";

    if (msgLower.includes("عربي") || msgLower.includes("العربية")) {
      lang = "Arabic";
    } else if (msgLower.includes("עברית") || msgLower.includes("עיברית") || msgLower.includes("بالعبرية")) {
      lang = "Hebrew";
    }

    const systemPrompt = `
      You are a helpful financial assistant. You must respond ONLY in ${lang}.
      If the user asks something unrelated to personal finance, such as politics or general questions, kindly redirect them back to financial topics.
      If the user requests another language, you may switch to it (Arabic or Hebrew only).
      
      The user has a monthly budget of ${totalBudget || "unknown"}.
      Monthly spending is ${totalSpend || "unknown"}.
      Monthly income is ${totalIncome || "unknown"}.
      
      Stick to financial advice and do not discuss anything else.
    `;

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
      JSON.stringify({
        advice: "حدث خطأ أثناء المعالجة. حاول مجددًا لاحقًا.",
      }),
      { status: 500 }
    );
  }
}
