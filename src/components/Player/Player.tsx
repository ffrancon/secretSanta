import { useState } from 'react';
import './Player.css';
import IconCross from '@icons/cross.svg?react';
import IconEdit from '@icons/edit.svg?react';
import IconBin from '@icons/bin.svg?react';
import IconCheck from '@icons/check.svg?react';

type PlayerProps = {
  player: string;
  updatePlayers: (...args: any[]) => void;
};

const Player = ({ player, updatePlayers }: PlayerProps) => {
  const [mode, setMode] = useState('display');
  const [value, setValue] = useState(player);

  return (
    <div className="Player">
      {mode === 'display' ? (
        <>
          <p>{player}</p>
          <div className="Player-buttons">
            <button
              aria-label="edit"
              onClick={() => {
                setMode('edit');
              }}
              className="IconButton"
            >
              <IconEdit />
            </button>
            <button
              aria-label="delete"
              onClick={() => {
                updatePlayers({ action: 'remove', player });
              }}
              className="IconButton"
            >
              <IconBin />
            </button>
          </div>
        </>
      ) : (
        <>
          <input
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            className="Player-input"
          />
          <div className="Player-buttons">
            <button
              aria-label="validate"
              onClick={() => {
                updatePlayers({ action: 'edit', player, newValue: value });
                setMode('display');
              }}
              className="IconButton"
            >
              <IconCheck />
            </button>
            <button
              onClick={() => {
                setValue(player);
                setMode('display');
              }}
              className="IconButton"
            >
              <IconCross />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Player;
