import { defaultMessage } from '@/constants';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { SecretSantaResult } from '@utils/generateSecretSantaList';
import { useSelector } from 'react-redux';
import { RootState } from './store';

export type Config = {
  players: string[];
  message: string;
  result: SecretSantaResult;
};

const initialState: Config = {
  players: [],
  message: defaultMessage,
  result: [],
};

const config = createSlice({
  name: 'config',
  initialState,
  reducers: {
    addPlayer: (state, action: PayloadAction<{ player: string }>) => {
      state.players.push(action.payload.player);
      // Reset result when player list changes
      state.result = [];
    },
    removePlayer: (state, action: PayloadAction<{ player: string }>) => {
      const index = state.players.indexOf(action.payload.player);
      state.players.splice(index, 1);
      // Reset result when player list changes
      state.result = [];
    },
    updatePlayer: (
      state,
      action: PayloadAction<{ player: string; newValue: string }>
    ) => {
      const index = state.players.indexOf(action.payload.player);
      const { player, newValue } = action.payload;
      state.players.splice(index, 1, newValue);
      // Update result entries with new value
      const updatedResult = [...state.result].map(({ giver, receiver }) => {
        if (giver === player) {
          return {
            giver: newValue,
            receiver,
          };
        }
        if (receiver === player) {
          return {
            giver,
            receiver: newValue,
          };
        }
        return { giver, receiver };
      });
      state.result = updatedResult;
    },
    setResult: (
      state,
      action: PayloadAction<{ result: SecretSantaResult }>
    ) => {
      state.result = action.payload.result;
    },
  },
});

export const { addPlayer, removePlayer, updatePlayer, setResult } =
  config.actions;

export const useGetPlayers = () =>
  useSelector((state: RootState) => state.config.players);
export const useGetMessage = () =>
  useSelector((state: RootState) => state.config.message);
export const useGetResult = () =>
  useSelector((state: RootState) => state.config.result);

export default config.reducer;
