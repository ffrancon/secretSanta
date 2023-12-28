import { useState } from 'react';
import './Player.css';
import IconCross from '@icons/cross.svg?react';
import IconEdit from '@icons/edit.svg?react';
import IconBin from '@icons/bin.svg?react';
import IconCheck from '@icons/check.svg?react';
import { useDispatch } from 'react-redux';
import { removePlayer, updatePlayer } from '@redux/config.slice';

type PlayerProps = {
  player: string;
};

const Player = ({ player }: PlayerProps) => {
  const [mode, setMode] = useState('display');
  const [value, setValue] = useState(player);

  const dispatch = useDispatch();

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
                dispatch(removePlayer({ player }));
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
            onKeyDown={(e) => {
              const targetValue = (e.target as HTMLInputElement).value;
              if (e.key === 'Enter' && !!targetValue) {
                dispatch(updatePlayer({ player, newValue: targetValue }));
                setMode('display');
              }
            }}
            className="Player-input"
          />
          <div className="Player-buttons">
            <button
              aria-label="validate"
              onClick={() => {
                dispatch(updatePlayer({ player, newValue: value }));
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
