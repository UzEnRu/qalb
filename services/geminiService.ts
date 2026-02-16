
import { GoogleGenAI, Type } from "@google/genai";
import { QuoteResponse, MiracleResponse } from "../types.ts";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getSoulQuote = async (category: string): Promise<QuoteResponse> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Menga ${category} haqida o'ta go'zal, chuqur ma'noli va ilhomlantiruvchi o'zbekcha hikmatli so'z yoki kichik she'riy parcha yozib ber. Javobni JSON formatida ber: { "text": "...", "author": "...", "category": "..." }`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          text: { type: Type.STRING, description: 'Hikmatli so\'z yoki she\'r matni' },
          author: { type: Type.STRING, description: 'Muallif nomi yoki "Xalq hikmati"' },
          category: { type: Type.STRING, description: 'Kategoriya nomi' }
        },
        required: ['text', 'author', 'category']
      },
      systemInstruction: "Siz mehribon, donishmand va shoir ko'ngilli o'zbek yozuvchisiz. Maqsadingiz odamlarga ruhiy taskin berish."
    }
  });

  try {
    return JSON.parse(response.text);
  } catch (e) {
    return {
      text: "Qalbingizda quyosh porlasin, zero mehr bor joyda zulmatga o'rin yo'q.",
      author: "Noma'lum",
      category: category as any
    };
  }
};

export const getMiracleMessage = async (type: string): Promise<MiracleResponse> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Menga "${type}" mavzusida bir mo'jizaviy, qalbni larzaga soladigan o'ta go'zal xabar yozib ber. Bu xabar insonning ruhini ko'tarsin. Shuningdek, uni ingliz tiliga ham tarjima qil. Javobni faqat JSON formatida ber: { "uzbek": "...", "english": "..." }`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          uzbek: { type: Type.STRING, description: 'O\'zbek tilidagi mo\'jizaviy matn' },
          english: { type: Type.STRING, description: 'The English translation of the miracle text' }
        },
        required: ['uzbek', 'english']
      },
      systemInstruction: "Siz Asadbek Ashurov tomonidan yaratilgan mo'jizalar elchisisiz. Sizning so'zlaringiz sehrli va nurli bo'lishi kerak."
    }
  });

  try {
    return JSON.parse(response.text);
  } catch (e) {
    return {
      uzbek: "Sening qalbing — koinotning eng go'zal mo'jizasidir.",
      english: "Your heart is the most beautiful miracle of the universe."
    };
  }
};

export const getPeaceAdvice = async (userFeeling: string): Promise<string> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Foydalanuvchi o'zini shunday his qilmoqda: "${userFeeling}". Unga o'zbek tilida juda samimiy, do'stona va ruhiy taskin beruvchi 2-3 jumlali javob qaytar.`,
    config: {
      systemInstruction: "Siz inson qalbini tushunadigan, Asadbek Ashurov tomonidan yaratilgan virtual ma'naviy yo'lboshchisiz. Foydalanuvchiga 'siz' deb murojaat qiling va uning ko'nglini ko'taring."
    }
  });
  return response.text || "Siz bilan hammasi yaxshi bo'ladi. Faqat nafas oling va tinchlikni his qiling.";
};
