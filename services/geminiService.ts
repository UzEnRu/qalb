import { GoogleGenerativeAI } from "@google/generative-ai";
import { QuoteResponse, MiracleResponse } from "../types";

// 1. Vite va Vercel uchun API kalitini to'g'ri o'qish
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.error("DIQQAT: VITE_GEMINI_API_KEY topilmadi!");
}

const genAI = new GoogleGenerativeAI(API_KEY || "");

// Modelni tanlash (Gemini 3 Flash - Free tier uchun eng yaxshisi)
const model = genAI.getGenerativeModel({ 
  model: "gemini-1.5-flash", // Hozirgi barqaror versiya
  generationConfig: { responseMimeType: "application/json" }
});

export const getSoulQuote = async (category: string): Promise<QuoteResponse> => {
  const prompt = `Menga ${category} haqida o'ta go'zal, chuqur ma'noli va ilhomlantiruvchi o'zbekcha hikmatli so'z yozib ber. 
  Javobni FAQAT ushbu JSON formatida ber: { "text": "...", "author": "...", "category": "${category}" }`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return JSON.parse(response.text());
  } catch (e) {
    console.error("Quote Error:", e);
    return {
      text: "Qalbingizda quyosh porlasin, zero mehr bor joyda zulmatga o'rin yo'q.",
      author: "Xalq hikmati",
      category: category as any
    };
  }
};

export const getMiracleMessage = async (type: string): Promise<MiracleResponse> => {
  const prompt = `Menga "${type}" mavzusida bir mo'jizaviy, qalbni larzaga soladigan o'ta go'zal o'zbekcha xabar yozib ber. 
  Uni ingliz tiliga ham tarjima qil. Javobni FAQAT JSON formatida ber: { "uzbek": "...", "english": "..." }`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return JSON.parse(response.text());
  } catch (e) {
    return {
      uzbek: "Sening qalbing — koinotning eng go'zal mo'jizasidir.",
      english: "Your heart is the most beautiful miracle of the universe."
    };
  }
};

export const getPeaceAdvice = async (userFeeling: string): Promise<string> => {
  // Maslahat uchun JSON shart emas, oddiy tekst olamiz
  const adviceModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const prompt = `Foydalanuvchi o'zini shunday his qilmoqda: "${userFeeling}". 
  Unga o'zbek tilida juda samimiy, do'stona va ruhiy taskin beruvchi 2-3 jumlali javob qaytar. 
  Siz Asadbek Ashurov tomonidan yaratilgan virtual ma'naviy yo'lboshchisiz.`;

  try {
    const result = await adviceModel.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (e) {
    return "Siz bilan hammasi yaxshi bo'ladi. Faqat nafas oling va tinchlikni his qiling.";
  }
};