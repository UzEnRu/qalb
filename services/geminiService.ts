import Groq from "groq-sdk";
import { QuoteResponse, MiracleResponse } from "../types";

// Groq API kalitini olish
const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true // Frontendda ishlashi uchun shart
});

export const getSoulQuote = async (category: string): Promise<QuoteResponse> => {
  const prompt = `Menga ${category} haqida o'ta go'zal o'zbekcha hikmatli so'z yozib ber. 
  Javobni FAQAT ushbu JSON formatida qaytar: { "text": "...", "author": "...", "category": "${category}" }`;

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile", // Eng kuchli va tezkor model
      response_format: { type: "json_object" }, // JSON qaytarishini kafolatlaydi
      temperature: 0.9,
    });

    const content = chatCompletion.choices[0]?.message?.content || "{}";
    return JSON.parse(content);
  } catch (e) {
    console.error("Groq Quote Error:", e);
    return {
      text: "Mehr bor joyda nur bor, zulmatga o'rin yo'q.",
      author: "Xalq hikmati",
      category: category as any
    };
  }
};

export const getMiracleMessage = async (type: string): Promise<MiracleResponse> => {
  const prompt = `Menga "${type}" haqida mo'jizaviy o'zbekcha xabar yozib ber va inglizchaga tarjima qil. 
  Javobni FAQAT JSON formatida ber: { "uzbek": "...", "english": "..." }`;

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" },
    });

    const content = chatCompletion.choices[0]?.message?.content || "{}";
    return JSON.parse(content);
  } catch (e) {
    return {
      uzbek: "Siz hayotning eng go'zal mo'jizasisiz.",
      english: "You are the most beautiful miracle of life."
    };
  }
};

export const getPeaceAdvice = async (userFeeling: string): Promise<string> => {
  const prompt = `Foydalanuvchi hissi: "${userFeeling}". Unga samimiy, do'stona o'zbekcha tasalli yoz (2-3 jumla).`;

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.1-8b-instant", // Maslahat uchun juda tezkor model
      temperature: 0.8,
    });

    return chatCompletion.choices[0]?.message?.content || "Hammasi yaxshi bo'ladi, nafas oling.";
  } catch (e) {
    return "Siz bilan hammasi yaxshi bo'ladi. Faqat nafas oling va tinchlikni his qiling.";
  }
};