
export enum AppView {
  START = 'START',
  BROWSER = 'BROWSER',
  PARTY = 'PARTY',
  SETTINGS = 'SETTINGS'
}

export enum LobbyVisibility {
  PUBLIC = 'PUBLIC',
  FRIENDS = 'FRIENDS',
  PRIVATE = 'PRIVATE'
}

export interface Player {
  id: string;
  name: string;
  isLeader: boolean;
  avatarUrl: string;
  status: 'Ready' | 'Not Ready' | 'Searching';
}

export interface Lobby {
  id: string;
  name: string;
  playersCount: number;
  maxPlayers: number;
  visibility: LobbyVisibility;
  ping: number;
}
