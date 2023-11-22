import { createContext, useContext } from "react";

export type PlayersContextType = {
  players: string[];
  setPlayers: React.Dispatch<React.SetStateAction<string[]>>;
};

const PlayersContext = createContext<PlayersContextType>({
  players: [],
  setPlayers: () => {},
});

export const useGetPlayers = () => {
  const { players } = useContext(PlayersContext);
  return players;
};

export const useGetPlayersContext = () => useContext(PlayersContext);

export default PlayersContext;
