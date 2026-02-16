
import React from 'react';
import { Mail, Github, Instagram, ExternalLink } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-20 px-4">
      <div className="glass p-12 rounded-[3rem] shadow-xl overflow-hidden relative">
        <div className="absolute top-0 right-0 p-8">
            <div className="w-40 h-40 bg-amber-50 rounded-full blur-3xl opacity-50"></div>
        </div>
        
        <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="w-24 h-24 bg-amber-100 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-4xl font-serif text-amber-600 font-bold">AA</span>
            </div>
            <h2 className="text-4xl font-serif text-stone-800 mb-4 tracking-tight">Asadbek Ashurov</h2>
            <p className="text-amber-600 font-medium uppercase tracking-[0.2em] text-sm mb-6">Loyiha Muallifi</p>
            <p className="text-stone-600 leading-relaxed mb-8">
              "Inson qalbini tushunish va unga taskin berish — dunyodagi eng oliy san'atdir. 
              Ushbu platforma orqali men har bir tashrif buyuruvchiga ozgina bo'lsa-da 
              ma'naviy nur va iliqlik ulashishni maqsad qildim."
            </p>
            
            <div className="flex gap-4">
              <a href="#" className="p-3 bg-stone-100 rounded-full text-stone-600 hover:bg-stone-800 hover:text-white transition-all">
                <Instagram size={20} />
              </a>
              <a href="#" className="p-3 bg-stone-100 rounded-full text-stone-600 hover:bg-stone-800 hover:text-white transition-all">
                <Github size={20} />
              </a>
              <a href="#" className="p-3 bg-stone-100 rounded-full text-stone-600 hover:bg-stone-800 hover:text-white transition-all">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white/50 p-6 rounded-2xl border border-stone-100">
                <h4 className="font-serif text-xl mb-2">G'oya asosi</h4>
                <p className="text-sm text-stone-500">
                    O'zbek madaniyati va donishmandligi orqali insonlarni birlashtirish va ruhiy muvozanatni tiklash.
                </p>
            </div>
            <div className="bg-white/50 p-6 rounded-2xl border border-stone-100">
                <h4 className="font-serif text-xl mb-2">Texnologiya</h4>
                <p className="text-sm text-stone-500">
                    Gemini AI yordamida har bir inson uchun individual va samimiy muloqot tizimi.
                </p>
            </div>
            <div className="bg-white/50 p-6 rounded-2xl border border-stone-100">
                <h4 className="font-serif text-xl mb-2">Bog'lanish</h4>
                <div className="flex items-center gap-2 text-amber-600 hover:underline cursor-pointer">
                    <span className="text-sm">asadbekashurov.uz</span>
                    <ExternalLink size={14} />
                </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-12 text-center text-stone-400 text-sm">
        <p>&copy; {new Date().getFullYear()} Qalb Bog'i. Barcha huquqlar himoyalangan.</p>
        <p className="mt-2 font-medium">Asadbek Ashurov tomonidan maxsus yaratilgan.</p>
      </div>
    </div>
  );
};

export default About;
