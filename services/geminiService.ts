import { GoogleGenerativeAI } from "@google/generative-ai";
import { QuoteResponse, MiracleResponse } from "../types";

// API kalitini olish
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY || "");

// Modelni har safar yangi parametrlar bilan olish funksiyasi
const getModel = (isJson = true) => {
  return genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    generationConfig: { 
      temperature: 1.0, 
      topP: 0.95,
      responseMimeType: isJson ? "application/json" : "text/plain",
    }
  });
};

// 1. Hikmatli so'zlar uchun
export const getSoulQuote = async (category: string): Promise<QuoteResponse> => {
  const model = getModel(true);
  const randomSeed = Math.random().toString(36).substring(7);
  
  const prompt = `Menga ${category} haqida o'ta go'zal, chuqur ma'noli va ilhomlantiruvchi o'zbekcha hikmatli so'z yozib ber. 
  ID: ${randomSeed}. Javobni FAQAT ushbu JSON formatida ber: { "text": "...", "author": "...", "category": "${category}" }`;

  try {
    const result = await model.generateContent(prompt);
    return JSON.parse(result.response.text());
  } catch (e) {
    return {
      text: "Qalbingizda quyosh porlasin, zero mehr bor joyda zulmatga o'rin yo'q.",
      author: "Xalq hikmati",
      category: category as any
    };
  }
};

// 2. Mo'jizaviy xabarlar uchun (MiracleModal qidirayotgan funksiya)
export const getMiracleMessage = async (type: string): Promise<MiracleResponse> => {
  const model = getModel(true);
  const randomSeed = Math.random().toString(36).substring(7);

  const prompt = `Menga "${type}" mavzusida bir mo'jizaviy, qalbni larzaga soladigan o'ta go'zal o'zbekcha xabar yozib ber. 
  ID: ${randomSeed}. Uni ingliz tiliga ham tarjima qil. Javobni FAQAT JSON formatida ber: { "uzbek": "...", "english": "..." }`;

  try {
    const result = await model.generateContent(prompt);
    return JSON.parse(result.response.text());
  } catch (e) {
    return {
      uzbek: "Sening qalbing — koinotning eng go'zal mo'jizasidir.",
      english: "Your heart is the most beautiful miracle of the universe."
    };
  }
};

// 3. Ruhshunos maslahati uchun
export const getPeaceAdvice = async (userFeeling: string): Promise<string> => {
  const model = getModel(false);
  const randomSeed = Math.random().toString(36).substring(7);

  const prompt = `Foydalanuvchi o'zini shunday his qilmoqda: "${userFeeling}". 
  Unga o'zbek tilida juda samimiy, do'stona va ruhiy taskin beruvchi 2-3 jumlali javob qaytar. 
  ID: ${randomSeed}. Siz Asadbek Ashurov tomonidan yaratilgan virtual ma'naviy yo'lboshchisiz.`;

  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (e) {
    return "Siz bilan hammasi yaxshi bo'ladi. Faqat nafas oling va tinchlikni his qiling.";
  }
};