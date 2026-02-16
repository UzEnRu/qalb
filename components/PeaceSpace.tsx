
import React, { useState, useEffect } from 'react';
import { getPeaceAdvice } from '../services/geminiService.ts';
import { Send, Wind } from 'lucide-react';

const PeaceSpace: React.FC = () => {
  const [feeling, setFeeling] = useState('');
  const [advice, setAdvice] = useState<string | null>(null);
  const [isBreathing, setIsBreathing] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feeling.trim()) return;
    setLoading(true);
    const result = await getPeaceAdvice(feeling);
    setAdvice(result);
    setLoading(false);
    setFeeling('');
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 flex flex-col items-center">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-serif text-stone-800 mb-4">Sokinlik maskani</h2>
        <p className="text-stone-600">Bu yerda siz o'zingiz bilan yolg'iz qolishingiz mumkin.</p>
      </div>

      <div className="mb-20 flex flex-col items-center">
        <div 
          onClick={() => setIsBreathing(!isBreathing)}
          className={`w-64 h-64 rounded-full border-4 border-amber-100 flex items-center justify-center cursor-pointer transition-all duration-1000 ${
            isBreathing ? 'scale-125 bg-amber-50' : 'scale-100 bg-white'
          } shadow-inner`}
        >
          <div className="text-center">
            <Wind size={40} className="text-amber-400 mx-auto mb-2" />
            <p className="text-stone-400 font-medium">{isBreathing ? 'Nafas chiqaring' : 'Nafas oling'}</p>
          </div>
        </div>
        <p className="mt-8 text-stone-400 text-sm italic">Oram olish uchun doiraga bosing</p>
      </div>

      <div className="w-full max-w-xl glass p-8 rounded-3xl">
        <h3 className="text-xl font-serif text-stone-700 mb-6 text-center">Hozir o'zingizni qanday his qilyapsiz?</h3>
        <form onSubmit={handleSubmit} className="relative mb-8">
          <input
            type="text"
            value={feeling}
            onChange={(e) => setFeeling(e.target.value)}
            placeholder="Tuyg'ularingizni yozing..."
            className="w-full bg-white/50 border border-stone-200 rounded-full py-4 px-6 pr-16 focus:outline-none focus:ring-2 focus:ring-amber-200 text-stone-700"
          />
          <button
            type="submit"
            disabled={loading}
            className="absolute right-2 top-2 bg-amber-500 hover:bg-amber-600 text-white p-2 rounded-full transition-colors disabled:opacity-50"
          >
            <Send size={20} />
          </button>
        </form>

        {advice && (
          <div className="bg-amber-50/50 p-6 rounded-2xl border border-amber-100 animate-fade-in">
            <p className="text-stone-700 italic leading-relaxed">"{advice}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PeaceSpace;
