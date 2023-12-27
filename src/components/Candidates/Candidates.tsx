import React, { useState } from 'react';
import { useGetPlayersContext } from '@context/players';
import Player from '../Player/Player';
import './Candidates.css';
import IconAdd from '@icons/add.svg?react';
import { slugify } from '@utils/slugify';

type ActionParams = {
  action: string;
  player: string;
  newValue?: string;
};

const getUpdatedPlayers = (
  players: string[],
  { action, player, newValue = '' }: ActionParams
) => {
  const newPlayers = [...players];
  if (!player) return null;
  switch (action) {
    case 'add': {
      if (!players.includes(player)) newPlayers.push(player);
      return newPlayers;
    }
    case 'remove': {
      const index = players.indexOf(player);
      newPlayers.splice(index, 1);
      return newPlayers;
    }
    case 'edit': {
      if (!players.includes(newValue)) {
        const index = players.indexOf(player);
        newPlayers.splice(index, 1, newValue);
      }
      return newPlayers;
    }
    default:
      return null;
  }
};

const Candidates = () => {
  const [value, setValue] = useState('');
  const { players, setPlayers } = useGetPlayersContext();

  const updatePlayers = ({ action, player, newValue }: ActionParams) => {
    const updatedPlayers = getUpdatedPlayers(players, {
      action,
      player,
      newValue,
    });
    if (!!updatedPlayers) {
      setPlayers(updatedPlayers);
      setValue('');
    }
  };

  return (
    <div className="Candidates">
      <div className="Candidates-inputContainer">
        <input
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          onKeyDown={(e) => {
            const targetValue = (e.target as HTMLInputElement).value;
            if (e.key === 'Enter' && !!targetValue) {
              updatePlayers({ action: 'add', player: targetValue });
            }
          }}
          className="Candidates-input"
        />
        <button
          className="Candidates-addButton"
          onClick={() => {
            updatePlayers({ action: 'add', player: value });
          }}
        >
          <IconAdd />
        </button>
      </div>
      <h2 className="Candidates-title">
        Liste des participants
        {players.length > 0 ? ` (${players.length})` : ''}
      </h2>
      {players.length > 0 ? (
        <div className="Candidates-players">
          {players.map((p) => (
            <React.Fragment key={`player-${slugify(p)}`}>
              <Player player={p} updatePlayers={updatePlayers} />
            </React.Fragment>
          ))}
        </div>
      ) : (
        <p className="Candidates-emptyList">
          Aucun participant n'a encore été saisi.
        </p>
      )}
    </div>
  );
};

export default Candidates;
