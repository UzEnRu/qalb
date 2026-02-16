import { GoogleGenerativeAI } from "@google/generative-ai";

// API kalitini olish
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || "");

export const getSoulQuote = async (category: string) => {
  // Model nomini models/ prefiksisiz bering, kutubxona o'zi qo'shadi
  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    generationConfig: {
      temperature: 1.0,
      responseMimeType: "application/json",
    }
  });

  const prompt = `Menga ${category} haqida yangi o'zbekcha hikmat yoz. JSON: {"text": "...", "author": "..."}`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return JSON.parse(text);
  } catch (error: any) {
    console.error("Batafsil xato:", error);
    // Agar 404 bo'lsa, demak kalit yoki model nomi hali ham muammo
    throw error;
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