import { GoogleGenerativeAI } from "@google/generative-ai";
import { QuoteResponse, MiracleResponse } from "../types";

// API kalitini olish (Vite uchun)
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY || "");

// getModel funksiyasini aniq belgilash (xatoni yo'qotish uchun)
const getModelInstance = (isJson = true) => {
  return genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash", // v1beta muammosi bo'lsa, kutubxona o'zi v1 ga o'tadi
    generationConfig: { 
      temperature: 1.0, 
      topP: 0.95,
      responseMimeType: isJson ? "application/json" : "text/plain",
    }
  });
};

export const getSoulQuote = async (category: string): Promise<QuoteResponse> => {
  const model = getModelInstance(true);
  const randomSeed = Math.random().toString(36).substring(7);
  const prompt = `Menga ${category} haqida yangi o'zbekcha hikmat yoz. ID: ${randomSeed}. FAQAT JSON: { "text": "...", "author": "...", "category": "${category}" }`;

  try {
    const result = await model.generateContent(prompt);
    return JSON.parse(result.response.text());
  } catch (e) {
    console.error("SoulQuote Error:", e);
    return { text: "Mehr bor joyda nur bor.", author: "Xalq hikmati", category: category as any };
  }
};

export const getMiracleMessage = async (type: string): Promise<MiracleResponse> => {
  const model = getModelInstance(true);
  const randomSeed = Math.random().toString(36).substring(7);
  const prompt = `Menga "${type}" haqida mo'jizaviy xabar yoz. ID: ${randomSeed}. FAQAT JSON: { "uzbek": "...", "english": "..." }`;

  try {
    const result = await model.generateContent(prompt);
    return JSON.parse(result.response.text());
  } catch (e) {
    return { uzbek: "Siz mo'jizasiz.", english: "You are a miracle." };
  }
};

export const getPeaceAdvice = async (userFeeling: string): Promise<string> => {
  const model = getModelInstance(false); // Plain text uchun
  const prompt = `Foydalanuvchi hissi: "${userFeeling}". Unga samimiy o'zbekcha tasalli yoz (2-3 jumla).`;

  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (e) {
    return "Hammasi yaxshi bo'ladi, nafas oling.";
  }
};