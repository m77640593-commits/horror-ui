
import React from 'react';
import { Lobby, LobbyVisibility } from '../types';

interface LobbyBrowserProps {
  onBack: () => void;
  onJoin: (name: string) => void;
  onCreate: () => void;
}

const MOCK_LOBBIES: Lobby[] = [
  { id: '1', name: 'The Basement Crypt', playersCount: 1, maxPlayers: 4, visibility: LobbyVisibility.PUBLIC, ping: 42 },
  { id: '2', name: 'Quiet Forest Run', playersCount: 3, maxPlayers: 4, visibility: LobbyVisibility.PUBLIC, ping: 110 },
  { id: '3', name: 'Sanitarium [HARD]', playersCount: 2, maxPlayers: 4, visibility: LobbyVisibility.PUBLIC, ping: 68 },
  { id: '4', name: 'Night Shift', playersCount: 4, maxPlayers: 4, visibility: LobbyVisibility.PUBLIC, ping: 55 },
];

const LobbyBrowser: React.FC<LobbyBrowserProps> = ({ onBack, onJoin, onCreate }) => {
  return (
    <div className="w-full max-w-5xl h-[80vh] flex flex-col bg-zinc-950/80 border border-zinc-800/50 backdrop-blur-sm p-8 rounded-sm">
      <div className="flex justify-between items-end mb-8 border-b border-zinc-800 pb-4">
        <div>
          <h2 className="nosifer text-3xl text-red-800 uppercase">Disturbed Realms</h2>
          <p className="text-zinc-500 text-sm mt-1">Available sessions for containment</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={onCreate}
            className="px-6 py-2 bg-red-900/40 border border-red-800 text-red-200 hover:bg-red-800 hover:text-white transition-all text-sm uppercase tracking-widest"
          >
            Create New Ritual
          </button>
          <button 
            onClick={onBack}
            className="px-6 py-2 border border-zinc-800 text-zinc-500 hover:text-zinc-200 hover:border-zinc-500 transition-all text-sm uppercase tracking-widest"
          >
            Return
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
        <div className="grid grid-cols-12 gap-4 px-4 py-2 text-xs text-zinc-600 font-bold uppercase tracking-wider">
          <div className="col-span-6">Realm Identity</div>
          <div className="col-span-2 text-center">Inhabitants</div>
          <div className="col-span-2 text-center">Stability (ms)</div>
          <div className="col-span-2 text-right">Action</div>
        </div>

        {MOCK_LOBBIES.map((lobby) => (
          <div 
            key={lobby.id}
            className="grid grid-cols-12 gap-4 items-center px-4 py-4 bg-zinc-900/30 border border-transparent hover:border-red-900/50 hover:bg-red-950/10 transition-all group"
          >
            <div className="col-span-6">
              <span className="text-lg text-zinc-300 group-hover:text-red-200">{lobby.name}</span>
            </div>
            <div className="col-span-2 text-center text-zinc-400 font-mono">
              {lobby.playersCount}/{lobby.maxPlayers}
            </div>
            <div className={`col-span-2 text-center font-mono ${lobby.ping > 100 ? 'text-red-500' : 'text-green-500'}`}>
              {lobby.ping}
            </div>
            <div className="col-span-2 text-right">
              <button 
                onClick={() => onJoin(lobby.name)}
                disabled={lobby.playersCount >= lobby.maxPlayers}
                className="text-xs uppercase tracking-widest text-red-700 hover:text-red-500 disabled:opacity-30 disabled:pointer-events-none"
              >
                {lobby.playersCount >= lobby.maxPlayers ? 'FULL' : 'ENTER'}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-between items-center text-[10px] text-zinc-700 tracking-tighter">
        <div>FILTERS: ALL REGIONS | <span className="text-red-900">PUBLIC ONLY</span> | SURVIVAL MODE</div>
        <div>CONNECTION STATUS: WEAK ENCRYPTED</div>
      </div>
    </div>
  );
};

export default LobbyBrowser;
