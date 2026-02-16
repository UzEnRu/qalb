import React, { useState } from 'react';
import { getPeaceAdvice } from '../services/geminiService';
import { Send, Wind, Loader2 } from 'lucide-react';

const PeaceSpace: React.FC = () => {
  const [feeling, setFeeling] = useState('');
  const [advice, setAdvice] = useState<string | null>(null);
  const [isBreathing, setIsBreathing] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feeling.trim() || loading) return;
    
    setLoading(true);
    try {
      const result = await getPeaceAdvice(feeling);
      setAdvice(result);
    } catch (error) {
      setAdvice("Hozircha sukunat... Birozdan so'ng qayta urinib ko'ring.");
    } finally {
      setLoading(false);
      setFeeling('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 flex flex-col items-center animate-fade-in">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-serif text-stone-800 mb-4 italic">Sokinlik maskani</h2>
        <p className="text-stone-600 max-w-md mx-auto">Bu yerda siz dunyo shovqinidan uzoqlashib, o'zingiz bilan yolg'iz qolishingiz mumkin.</p>
      </div>

      {/* Nafas mashqi doirasi */}
      <div className="mb-20 flex flex-col items-center">
        <div 
          onClick={() => setIsBreathing(!isBreathing)}
          className={`w-56 h-56 rounded-full border-2 border-amber-200 flex items-center justify-center cursor-pointer transition-all duration-[3000ms] ease-in-out ${
            isBreathing ? 'scale-150 bg-amber-50/50 shadow-2xl' : 'scale-100 bg-white shadow-md'
          }`}
        >
          <div className="text-center">
            <Wind size={32} className={`text-amber-400 mx-auto mb-2 ${isBreathing ? 'animate-pulse' : ''}`} />
            <p className="text-stone-500 text-sm font-serif">
              {isBreathing ? 'Nafas chiqaring...' : 'Nafas oling...'}
            </p>
          </div>
        </div>
        <p className="mt-12 text-stone-400 text-sm italic tracking-wide">Tinchlanish uchun doiraga bosing</p>
      </div>

      {/* Tuyg'ular qismi */}
      <div className="w-full max-w-xl glass p-8 rounded-[2rem] shadow-sm border border-stone-100">
        <h3 className="text-xl font-serif text-stone-700 mb-6 text-center italic">Hozirgi hislaringizni baham ko'ring...</h3>
        <form onSubmit={handleSubmit} className="relative mb-6">
          <input
            type="text"
            value={feeling}
            onChange={(e) => setFeeling(e.target.value)}
            placeholder="Tuyg'ularingizni yozing (masalan: xavotir, quvonch)..."
            className="w-full bg-white/80 border border-stone-200 rounded-full py-4 px-6 pr-16 focus:outline-none focus:ring-2 focus:ring-amber-200 text-stone-700 transition-all"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !feeling.trim()}
            className="absolute right-2 top-2 bg-amber-500 hover:bg-amber-600 text-white p-2.5 rounded-full transition-all disabled:opacity-30 shadow-md"
          >
            {loading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
          </button>
        </form>

        {advice && (
          <div className="bg-white/60 p-6 rounded-2xl border border-amber-100 animate-fade-in shadow-inner">
            <p className="text-stone-700 italic leading-relaxed text-center font-serif">
               {advice}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PeaceSpace;