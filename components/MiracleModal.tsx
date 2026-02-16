
import React, { useState, useEffect } from 'react';
import { getMiracleMessage } from '../services/geminiService.ts';
import { MiracleResponse, MiracleType } from '../types.ts';
import { Sparkles, X } from 'lucide-react';

interface MiracleModalProps {
  type: MiracleType | null;
  onClose: () => void;
}

const MiracleModal: React.FC<MiracleModalProps> = ({ type, onClose }) => {
  const [miracle, setMiracle] = useState<MiracleResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (type) {
      const fetchMiracle = async () => {
        setLoading(true);
        const result = await getMiracleMessage(type);
        setMiracle(result);
        setLoading(false);
      };
      fetchMiracle();
    }
  }, [type]);

  if (!type) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-stone-900/40 backdrop-blur-xl animate-fade-in"
        onClick={onClose}
      />
      
      <div className="relative z-10 w-full max-w-2xl glass p-8 md:p-16 rounded-[3rem] shadow-2xl overflow-hidden animate-scale-in">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-stone-100 transition-colors"
        >
          <X size={24} className="text-stone-400" />
        </button>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber-400/20 rounded-full blur-[100px] -z-10 animate-pulse"></div>

        <div className="text-center">
          <div className="inline-block p-4 bg-amber-50 rounded-full mb-8">
            <Sparkles className="text-amber-500 animate-spin-slow" size={32} />
          </div>

          {loading ? (
            <div className="space-y-4">
              <div className="h-8 bg-stone-100 rounded-full w-3/4 mx-auto animate-pulse"></div>
              <div className="h-6 bg-stone-50 rounded-full w-1/2 mx-auto animate-pulse"></div>
              <p className="text-stone-400 italic pt-4">Mo'jiza sodir bo'lmoqda... A miracle is happening...</p>
            </div>
          ) : miracle && (
            <div className="animate-fade-in">
              <p className="text-3xl md:text-4xl font-serif text-stone-800 italic leading-relaxed mb-8">
                "{miracle.uzbek}"
              </p>
              <div className="h-px w-20 bg-amber-200 mx-auto mb-8"></div>
              <p className="text-lg text-stone-500 font-light leading-relaxed italic">
                {miracle.english}
              </p>
              
              <button 
                onClick={onClose}
                className="mt-12 px-10 py-3 rounded-full bg-amber-500 text-white font-medium hover:bg-amber-600 transition-all shadow-lg hover:shadow-amber-200/50"
              >
                Qalbga muhrlash / Seal in Heart
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MiracleModal;
