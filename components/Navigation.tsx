
import React from 'react';
import { AppSection } from '../types.ts';
import { Heart, Wind, Sparkles, User } from 'lucide-react';

interface NavigationProps {
  currentSection: AppSection;
  setSection: (section: AppSection) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentSection, setSection }) => {
  const navItems = [
    { id: AppSection.Home, label: 'Bosh sahifa', icon: Sparkles },
    { id: AppSection.Wisdom, label: 'Hikmatlar', icon: Heart },
    { id: AppSection.Peace, label: 'Orom', icon: Wind },
    { id: AppSection.About, label: 'Muallif', icon: User },
  ];

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 glass rounded-full px-6 py-3 flex gap-8 items-center shadow-2xl transition-all hover:scale-105">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentSection === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setSection(item.id)}
            className={`flex flex-col items-center gap-1 transition-colors ${
              isActive ? 'text-amber-600' : 'text-stone-400 hover:text-stone-600'
            }`}
          >
            <Icon size={20} />
            <span className="text-[10px] font-medium uppercase tracking-wider">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default Navigation;
