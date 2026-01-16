
import React from 'react';
import { Player, LobbyVisibility } from '../types';

interface PartyRoomProps {
  party: Player[];
  currentPlayer: Player;
  visibility: LobbyVisibility;
  setVisibility: (v: LobbyVisibility) => void;
  onKick: (id: string) => void;
  onPromote: (id: string) => void;
  onLeave: () => void;
}

const PartyRoom: React.FC<PartyRoomProps> = ({ 
  party, 
  currentPlayer, 
  visibility, 
  setVisibility, 
  onKick, 
  onPromote,
  onLeave
}) => {
  const isLeader = currentPlayer.isLeader;

  return (
    <div className="w-full max-w-6xl h-screen flex flex-col md:flex-row gap-8 p-12">
      {/* Left Side: Party Members */}
      <div className="flex-1 flex flex-col gap-4">
        <div className="mb-4">
          <h2 className="nosifer text-4xl text-red-700 tracking-tighter">THE COVEN</h2>
          <p className="text-zinc-600 text-sm uppercase tracking-widest mt-2">Waiting for the ritual to begin...</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {party.map((member) => (
            <PlayerCard 
              key={member.id} 
              player={member} 
              isOwn={member.id === currentPlayer.id}
              canManage={isLeader && member.id !== currentPlayer.id}
              onKick={() => onKick(member.id)}
              onPromote={() => onPromote(member.id)}
            />
          ))}
          {Array.from({ length: 4 - party.length }).map((_, i) => (
            <div key={`empty-${i}`} className="border-2 border-dashed border-zinc-900/50 h-64 flex items-center justify-center text-zinc-800 uppercase text-xs tracking-[1em]">
               Waiting
            </div>
          ))}
        </div>
      </div>

      {/* Right Side: Lobby Controls */}
      <div className="w-full md:w-80 flex flex-col gap-6 bg-black/40 border-l border-zinc-800 p-6 backdrop-blur-md">
        <div className="space-y-4">
          <h3 className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-4">Lobby Settings</h3>
          
          <div className="space-y-2">
            <label className="text-[10px] text-zinc-400 uppercase">Visibility</label>
            <div className="flex flex-col gap-2">
              <VisibilityOption 
                type={LobbyVisibility.PUBLIC} 
                active={visibility === LobbyVisibility.PUBLIC} 
                onClick={() => isLeader && setVisibility(LobbyVisibility.PUBLIC)}
                disabled={!isLeader}
              />
              <VisibilityOption 
                type={LobbyVisibility.FRIENDS} 
                active={visibility === LobbyVisibility.FRIENDS} 
                onClick={() => isLeader && setVisibility(LobbyVisibility.FRIENDS)}
                disabled={!isLeader}
              />
              <VisibilityOption 
                type={LobbyVisibility.PRIVATE} 
                active={visibility === LobbyVisibility.PRIVATE} 
                onClick={() => isLeader && setVisibility(LobbyVisibility.PRIVATE)}
                disabled={!isLeader}
              />
            </div>
          </div>
        </div>

        <div className="mt-auto space-y-4">
          {isLeader ? (
            <button className="w-full py-4 bg-red-700 text-white hover:bg-red-600 transition-all font-bold tracking-[0.3em] shadow-[0_0_20px_rgba(185,28,28,0.3)] animate-flicker">
              START RITUAL
            </button>
          ) : (
            <div className="w-full py-4 bg-zinc-900 border border-zinc-800 text-zinc-500 text-center text-xs italic tracking-widest">
              Awaiting host authorization...
            </div>
          )}
          
          <button 
            onClick={onLeave}
            className="w-full py-3 border border-zinc-800 text-zinc-500 hover:text-red-500 hover:border-red-900/50 transition-all text-xs tracking-widest"
          >
            ABANDON COVEN
          </button>
        </div>
      </div>
    </div>
  );
};

const PlayerCard: React.FC<{ 
  player: Player; 
  isOwn: boolean; 
  canManage: boolean;
  onKick: () => void;
  onPromote: () => void;
}> = ({ player, isOwn, canManage, onKick, onPromote }) => (
  <div className={`
    relative group h-64 overflow-hidden border transition-all duration-500
    ${isOwn ? 'border-red-900/50 bg-red-950/5' : 'border-zinc-800 bg-zinc-950'}
  `}>
    <img 
      src={player.avatarUrl} 
      alt={player.name}
      className="absolute inset-0 w-full h-full object-cover opacity-30 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
    />
    
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-4 flex flex-col justify-end">
      <div className="flex items-center gap-2">
        <h4 className="text-lg font-bold tracking-wider text-zinc-200">{player.name}</h4>
        {player.isLeader && (
            <span className="text-[10px] bg-red-900 text-red-100 px-1.5 py-0.5 rounded-sm uppercase font-bold animate-pulse">Host</span>
        )}
      </div>
      <p className={`text-xs uppercase tracking-tighter ${player.status === 'Ready' ? 'text-green-500' : 'text-zinc-600'}`}>
        Status: {player.status}
      </p>

      {canManage && (
        <div className="mt-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={onKick}
            className="text-[10px] text-red-500 hover:text-red-300 border border-red-900/50 px-2 py-1 bg-black/80"
          >
            KICK
          </button>
          <button 
            onClick={onPromote}
            className="text-[10px] text-zinc-400 hover:text-white border border-zinc-700 px-2 py-1 bg-black/80"
          >
            PROMOTE
          </button>
        </div>
      )}
    </div>

    {isOwn && <div className="absolute top-2 right-2 w-2 h-2 bg-red-600 rounded-full animate-ping" />}
  </div>
);

const VisibilityOption: React.FC<{ type: LobbyVisibility; active: boolean; onClick: () => void; disabled: boolean }> = ({ type, active, onClick, disabled }) => (
  <button 
    onClick={onClick}
    disabled={disabled}
    className={`
      flex items-center justify-between px-4 py-2 border transition-all text-left
      ${active ? 'border-red-800 bg-red-950/20 text-red-400' : 'border-zinc-800 text-zinc-600 hover:border-zinc-700'}
      ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
    `}
  >
    <span className="text-xs tracking-widest uppercase">{type}</span>
    <div className={`w-1.5 h-1.5 rounded-full ${active ? 'bg-red-500' : 'bg-zinc-800'}`} />
  </button>
);

export default PartyRoom;
