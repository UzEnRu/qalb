import { GoogleGenerativeAI } from "@google/generative-ai";
import { QuoteResponse, MiracleResponse } from "../types";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY || "");

// --- O'ZGARTIRILGAN QISM: IJODKORLIKNI OSHIRAMIZ ---
const model = genAI.getGenerativeModel({ 
  model: "gemini-1.5-flash",
  generationConfig: { 
    responseMimeType: "application/json",
    temperature: 1.0,  // 0.0 dan 1.0 gacha. 1.0 - eng yuqori ijodkorlik
    topP: 0.95,        // Turli xil so'zlar tanlash ehtimoli
  }
});

export const getSoulQuote = async (category: string): Promise<QuoteResponse> => {
  // Tasodifiylik uchun vaqt belgisini qo'shamiz
  const randomSeed = Math.random().toString(36).substring(7);
  
  const prompt = `Menga ${category} haqida o'ta go'zal, chuqur ma'noli va ilhomlantiruvchi o'zbekcha hikmatli so'z yozib ber. 
  Unique ID: ${randomSeed}. Har safar oldingisidan farq qiladigan, mutlaqo yangi fikr yoz.
  Javobni FAQAT ushbu JSON formatida ber: { "text": "...", "author": "...", "category": "${category}" }`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return JSON.parse(text);
  } catch (e) {
    console.error("Quote Error:", e);
    return {
      text: "Qalbingizda quyosh porlasin, zero mehr bor joyda zulmatga o'rin yo'q.",
      author: "Xalq hikmati",
      category: category as any
    };
  }
};

// getMiracleMessage funksiyasiga ham model.generateContent ishlatishda 
// yuqoridagi kabi randomSeed qo'shib yuborishingiz mumkin.