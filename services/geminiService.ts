import { GoogleGenerativeAI } from "@google/generative-ai";
import { QuoteResponse, MiracleResponse } from "../types";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY || "");

// Ijodkorlik darajasi (temperature: 1.0) va model sozlamalari
const model = genAI.getGenerativeModel({ 
  model: "gemini-1.5-flash",
  generationConfig: { 
    temperature: 1.0, 
    topP: 0.95,
  }
});

// JSON formatida javob beruvchi model (Hikmatlar va Mo'jizalar uchun)
const jsonModel = genAI.getGenerativeModel({ 
  model: "gemini-1.5-flash",
  generationConfig: { 
    responseMimeType: "application/json",
    temperature: 1.0, 
  }
});

export const getSoulQuote = async (category: string): Promise<QuoteResponse> => {
  const randomSeed = Math.random().toString(36).substring(7);
  const prompt = `Menga ${category} haqida o'ta go'zal, chuqur ma'noli va ilhomlantiruvchi o'zbekcha hikmatli so'z yozib ber. 
  Unique ID: ${randomSeed}. Javobni FAQAT ushbu JSON formatida ber: { "text": "...", "author": "...", "category": "${category}" }`;

  try {
    const result = await jsonModel.generateContent(prompt);
    const text = result.response.text();
    return JSON.parse(text);
  } catch (e) {
    return {
      text: "Qalbingizda quyosh porlasin, zero mehr bor joyda zulmatga o'rin yo'q.",
      author: "Xalq hikmati",
      category: category as any
    };
  }
};

export const getMiracleMessage = async (type: string): Promise<MiracleResponse> => {
  const randomSeed = Math.random().toString(36).substring(7);
  const prompt = `Menga "${type}" mavzusida bir mo'jizaviy, qalbni larzaga soladigan o'ta go'zal o'zbekcha xabar yozib ber. 
  Unique ID: ${randomSeed}. Uni ingliz tiliga ham tarjima qil. Javobni FAQAT JSON formatida ber: { "uzbek": "...", "english": "..." }`;

  try {
    const result = await jsonModel.generateContent(prompt);
    const text = result.response.text();
    return JSON.parse(text);
  } catch (e) {
    return {
      uzbek: "Sening qalbing — koinotning eng go'zal mo'jizasidir.",
      english: "Your heart is the most beautiful miracle of the universe."
    };
  }
};

// SHU FUNKSIYA ETISHMAYOTGAN EDI:
export const getPeaceAdvice = async (userFeeling: string): Promise<string> => {
  const randomSeed = Math.random().toString(36).substring(7);
  const prompt = `Foydalanuvchi o'zini shunday his qilmoqda: "${userFeeling}". 
  Unga o'zbek tilida juda samimiy, do'stona va ruhiy taskin beruvchi 2-3 jumlali javob qaytar. 
  Unique ID: ${randomSeed}. Siz Asadbek Ashurov tomonidan yaratilgan virtual ma'naviy yo'lboshchisiz.`;

  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (e) {
    return "Siz bilan hammasi yaxshi bo'ladi. Faqat nafas oling va tinchlikni his qiling.";
  }
};