import { GoogleGenerativeAI } from "@google/generative-ai";
import { QuoteResponse, MiracleResponse } from "../types";

// API kalitini olish
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || "");

// Modelni har safar yangi parametrlar bilan olish funksiyasi
const getModel = (isJson = true) => {
  return genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    generationConfig: { 
      temperature: 1.0, // Ijodkorlik eng balandda
      topP: 0.95,
      responseMimeType: isJson ? "application/json" : "text/plain",
    }
  });
};

export const getSoulQuote = async (category: string): Promise<QuoteResponse> => {
  const model = getModel(true);
  const randomSeed = Math.random().toString(36).substring(7);
  
  const prompt = `Menga ${category} haqida yangi, takrorlanmas o'zbekcha hikmat yoz. 
  ID: ${randomSeed}. Javob JSON formatida bo'lsin: { "text": "...", "author": "...", "category": "${category}" }`;

  const result = await model.generateContent(prompt);
  return JSON.parse(result.response.text());
};

export const getPeaceAdvice = async (userFeeling: string): Promise<string> => {
  const model = getModel(false);
  const randomSeed = Math.random().toString(36).substring(7);

  const prompt = `Foydalanuvchi hissi: "${userFeeling}". 
  Unga samimiy javob yoz. ID: ${randomSeed}. 2-3 jumla.`;

  const result = await model.generateContent(prompt);
  return result.response.text();
};