
import React, { useState, useEffect } from 'react';
import { getSoulQuote } from '../services/geminiService';
import { QuoteResponse } from '../types.ts';
import { RefreshCcw, Quote } from 'lucide-react';

const SoulQuotes: React.FC = () => {
  const [quote, setQuote] = useState<QuoteResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const categories = [
    { id: 'muhabbat', label: 'Muhabbat' },
    { id: 'tinchlik', label: 'Tinchlik' },
    { id: 'mehr', label: 'Mehr-oqibat' },
    { id: 'do\'stlik', label: 'Do\'stlik' },
  ];

const fetchQuote = async (cat: string) => {
  setLoading(true);
  // fetchQuote(cat + "?t=" + Date.now()) kabi emas, 
  // shunchaki getSoulQuote(cat) ichidagi randomSeed muammoni hal qiladi.
  const result = await getSoulQuote(cat);
  setQuote(result);
  setLoading(false);
};

  useEffect(() => {
    fetchQuote('mehr');
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-serif text-stone-800 mb-4 italic">Qalb gavharlari</h2>
        <p className="text-stone-600 max-w-md mx-auto">Yo'nalishni tanlang va qalbingizga mos so'zlarni tinglang.</p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => fetchQuote(cat.id)}
            className="px-6 py-2 rounded-full bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 hover:border-amber-300 transition-all shadow-sm"
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="relative min-h-[300px] flex items-center justify-center">
        {loading ? (
          <div className="flex flex-col items-center gap-4">
            <RefreshCcw className="animate-spin text-amber-500" size={32} />
            <p className="text-stone-500 italic">Siz uchun mo'jiza qidirilmoqda...</p>
          </div>
        ) : quote && (
          <div className="glass p-12 rounded-3xl text-center shadow-lg w-full transform transition-all duration-700 hover:scale-[1.02]">
            <Quote className="mx-auto mb-6 text-amber-200" size={48} />
            <p className="text-2xl md:text-3xl font-serif text-stone-800 leading-relaxed mb-8 italic">
              "{quote.text}"
            </p>
            <div className="h-px w-24 bg-amber-200 mx-auto mb-4"></div>
            <p className="text-stone-500 font-medium tracking-widest uppercase">
              {quote.author}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SoulQuotes;
