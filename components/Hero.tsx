
import React from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { MiracleType } from '../types';

interface HeroProps {
  onMiracleClick: (type: MiracleType) => void;
}

const Hero: React.FC<HeroProps> = ({ onMiracleClick }) => {
  return (
    <div className="relative min-h-[80vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-amber-100 rounded-full blur-3xl opacity-50 float-anim"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-blue-50 rounded-full blur-3xl opacity-50 float-anim" style={{ animationDelay: '1s' }}></div>
      
      <div className="z-10 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/50 border border-amber-200 text-amber-700 text-sm font-medium mb-8">
          <Sparkles size={16} />
          <span>Xush kelibsiz, aziz do'stim / Welcome, dear friend</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-serif text-stone-800 mb-8 leading-tight">
          Qalbingizning <span className="italic text-amber-600">sokin bog'iga</span> kiring
        </h1>
        <p className="text-lg md:text-xl text-stone-600 mb-12 leading-relaxed font-light">
          Bu yer — muhabbat, tinchlik va do'stlik maskani. <br/>
          <span className="text-sm opacity-70 italic block mt-2">A place for love, peace, and friendship. Rediscover your soul.</span>
        </p>
        
        <p className="text-amber-600 font-medium mb-6 animate-pulse">
          Mo'jizani his qilish uchun bosing / Click to feel the miracle:
        </p>

        <div className="flex flex-wrap justify-center gap-6">
          <button 
            onClick={() => onMiracleClick('muhabbat')}
            className="group flex items-center gap-3 glass px-8 py-4 rounded-full text-stone-700 shadow-sm transition-all hover:scale-110 hover:bg-white hover:shadow-xl hover:shadow-red-50"
          >
            <Heart className="text-red-400 group-hover:scale-125 transition-transform" size={24} />
            <div className="text-left">
              <span className="font-medium block">Muhabbat</span>
              <span className="text-[10px] uppercase tracking-widest opacity-50 group-hover:opacity-100 transition-opacity">Love ❤️</span>
            </div>
          </button>

          <button 
            onClick={() => onMiracleClick('tinchlik')}
            className="group flex items-center gap-3 glass px-8 py-4 rounded-full text-stone-700 shadow-sm transition-all hover:scale-110 hover:bg-white hover:shadow-xl hover:shadow-blue-50"
          >
            <span className="text-2xl group-hover:scale-125 transition-transform">🕊️</span>
            <div className="text-left">
              <span className="font-medium block">Tinchlik</span>
              <span className="text-[10px] uppercase tracking-widest opacity-50 group-hover:opacity-100 transition-opacity">Peace</span>
            </div>
          </button>

          <button 
            onClick={() => onMiracleClick('do\'stlik')}
            className="group flex items-center gap-3 glass px-8 py-4 rounded-full text-stone-700 shadow-sm transition-all hover:scale-110 hover:bg-white hover:shadow-xl hover:shadow-amber-50"
          >
            <span className="text-2xl group-hover:scale-125 transition-transform">🤝</span>
            <div className="text-left">
              <span className="font-medium block">Do'stlik</span>
              <span className="text-[10px] uppercase tracking-widest opacity-50 group-hover:opacity-100 transition-opacity">Friendship</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
