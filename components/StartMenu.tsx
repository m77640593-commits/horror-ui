
import React from 'react';

interface StartMenuProps {
  onPlay: () => void;
}

const StartMenu: React.FC<StartMenuProps> = ({ onPlay }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-12 max-w-2xl w-full">
      <div className="text-center">
        <h1 className="nosifer text-6xl md:text-8xl text-red-700 drop-shadow-[0_10px_10px_rgba(0,0,0,1)] tracking-tighter animate-pulse">
          ELDRITCH
        </h1>
        <h1 className="nosifer text-5xl md:text-7xl text-red-900 -mt-4 opacity-80 tracking-widest">
          ECHOES
        </h1>
      </div>

      <nav className="flex flex-col space-y-6 w-64">
        <MenuButton label="ENTER THE VOID" onClick={onPlay} primary />
        <MenuButton label="COLLECTIBLES" />
        <MenuButton label="SETTINGS" />
        <MenuButton label="ABANDON HOPE" />
      </nav>

      <div className="fixed bottom-8 left-8 text-xs text-red-900/40 uppercase tracking-[0.5em]">
        v0.4.2-ALPHA // DEV_BUILD
      </div>
    </div>
  );
};

const MenuButton: React.FC<{ label: string; onClick?: () => void; primary?: boolean }> = ({ label, onClick, primary }) => (
  <button
    onClick={onClick}
    className={`
      group relative px-6 py-4 text-left transition-all duration-300
      border-l-4 ${primary ? 'border-red-600' : 'border-zinc-800'}
      hover:border-red-500 hover:bg-red-950/20 hover:translate-x-2
    `}
  >
    <span className={`
      block text-xl tracking-widest transition-colors duration-300
      ${primary ? 'text-red-600' : 'text-zinc-500'}
      group-hover:text-red-400
    `}>
      {label}
    </span>
    <div className="absolute inset-0 bg-red-600 opacity-0 group-hover:opacity-5 blur-xl transition-opacity" />
  </button>
);

export default StartMenu;
