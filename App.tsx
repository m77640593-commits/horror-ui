
import React, { useState, useEffect, useCallback } from 'react';
import { AppView, Player, LobbyVisibility, Lobby } from './types';
import StartMenu from './components/StartMenu';
import LobbyBrowser from './components/LobbyBrowser';
import PartyRoom from './components/PartyRoom';
import Background from './components/common/Background';

const MOCK_CURRENT_USER: Player = {
  id: 'user-1',
  name: 'LostSoul_88',
  isLeader: true,
  avatarUrl: 'https://picsum.photos/seed/horror1/100/100',
  status: 'Not Ready'
};

const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.START);
  const [player, setPlayer] = useState<Player>(MOCK_CURRENT_USER);
  const [party, setParty] = useState<Player[]>([MOCK_CURRENT_USER]);
  const [visibility, setVisibility] = useState<LobbyVisibility>(LobbyVisibility.PUBLIC);

  const handleStartPlay = () => setView(AppView.BROWSER);
  const handleBackToStart = () => setView(AppView.START);
  
  const handleJoinParty = (lobbyName: string) => {
    // Simulate joining
    const newMember: Player = {
      id: 'user-2',
      name: 'ShadowWalker',
      isLeader: false,
      avatarUrl: 'https://picsum.photos/seed/horror2/100/100',
      status: 'Not Ready'
    };
    const updatedUser = { ...player, isLeader: false };
    setPlayer(updatedUser);
    setParty([
      { id: 'leader-0', name: 'OriginalHost', isLeader: true, avatarUrl: 'https://picsum.photos/seed/host/100/100', status: 'Ready' },
      updatedUser,
      newMember
    ]);
    setView(AppView.PARTY);
  };

  const handleCreateParty = () => {
    const freshUser = { ...player, isLeader: true };
    setPlayer(freshUser);
    setParty([freshUser]);
    setView(AppView.PARTY);
  };

  const handleKickPlayer = (id: string) => {
    setParty(prev => prev.filter(p => p.id !== id));
  };

  const handlePromotePlayer = (id: string) => {
    setParty(prev => prev.map(p => {
      if (p.id === id) return { ...p, isLeader: true };
      if (p.id === player.id) {
          setPlayer({ ...player, isLeader: false });
          return { ...p, isLeader: false };
      }
      return { ...p, isLeader: false };
    }));
  };

  const handleLeaveParty = () => {
    setView(AppView.BROWSER);
    setParty([player]);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden select-none cursor-crosshair">
      <Background />
      <div className="absolute inset-0 z-10 crt-overlay" />
      <div className="absolute inset-0 z-10 vignette" />
      
      <div className="relative z-20 w-full h-full flex items-center justify-center p-8">
        {view === AppView.START && (
          <StartMenu onPlay={handleStartPlay} />
        )}

        {view === AppView.BROWSER && (
          <LobbyBrowser 
            onBack={handleBackToStart} 
            onJoin={handleJoinParty}
            onCreate={handleCreateParty}
          />
        )}

        {view === AppView.PARTY && (
          <PartyRoom 
            party={party}
            currentPlayer={player}
            visibility={visibility}
            setVisibility={setVisibility}
            onKick={handleKickPlayer}
            onPromote={handlePromotePlayer}
            onLeave={handleLeaveParty}
          />
        )}
      </div>
    </div>
  );
};

export default App;
