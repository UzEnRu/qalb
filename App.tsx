// .tsx kengaytmalarini olib tashlang
import React, { useState } from 'react'; // "React" so'zi ham bo'lishi shart
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import SoulQuotes from './components/SoulQuotes';
import PeaceSpace from './components/PeaceSpace';
import About from './components/About';
import MiracleModal from './components/MiracleModal';
import { AppSection, MiracleType } from './types'; // .ts ham shart emas

const App: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<AppSection>(AppSection.Home);
  const [activeMiracle, setActiveMiracle] = useState<MiracleType | null>(null);

  const renderSection = () => {
    switch (currentSection) {
      case AppSection.Home:
        return <Hero onMiracleClick={setActiveMiracle} />;
      case AppSection.Wisdom:
        return <SoulQuotes />;
      case AppSection.Peace:
        return <PeaceSpace />;
      case AppSection.About:
        return <About />;
      default:
        return <Hero onMiracleClick={setActiveMiracle} />;
    }
  };

  return (
    <div className="min-h-screen pb-32">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-amber-50/30 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-50/20 rounded-full blur-[120px]"></div>
      </div>

      <header className="py-6 px-8 flex justify-between items-center z-50 relative">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white font-serif italic text-xl shadow-lg">Q</div>
          <span className="font-serif text-xl font-bold text-stone-800 tracking-tight">Qalb Bog'i</span>
        </div>
        <div className="hidden md:block text-stone-400 text-sm italic">
          "Mehr-oqibatni asrang, u eng katta boylikdir / Cherish kindness, it is the greatest wealth"
        </div>
      </header>

      <main className="animate-fade-in transition-all duration-500">
        {renderSection()}
      </main>

      <Navigation currentSection={currentSection} setSection={setCurrentSection} />
      
      {activeMiracle && (
        <MiracleModal type={activeMiracle} onClose={() => setActiveMiracle(null)} />
      )}

      {/* Global Creator Credit */}
      <div className="fixed top-6 right-8 z-50 hidden lg:block">
        <div className="glass px-4 py-2 rounded-full text-[11px] font-semibold text-stone-500 uppercase tracking-widest border border-amber-100 shadow-sm">
          Muallif: <span className="text-amber-700">Asadbek Ashurov</span>
        </div>
      </div>
    </div>
  );
};

export default App;
