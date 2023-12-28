import React, { useState } from 'react';
import Player from '../Player/Player';
import './Candidates.css';
import IconAdd from '@icons/add.svg?react';
import IconCheck from '@icons/check.svg?react';
import { slugify } from '@utils/slugify';
import { addPlayer, setResult, useGetPlayers } from '@redux/config.slice';
import { useDispatch } from 'react-redux';
import { generateSecretSantaList } from '@utils/generateSecretSantaList';

const Candidates = () => {
  const [value, setValue] = useState('');
  const players = useGetPlayers();
  const dispatch = useDispatch();

  const generateSecretSanta = () => {
    const result = generateSecretSantaList(players);
    dispatch(setResult({ result }));
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
              dispatch(addPlayer({ player: targetValue }));
              setValue('');
            }
          }}
          className="Candidates-input"
        />
        <button
          className="Candidates-addButton"
          onClick={() => {
            dispatch(addPlayer({ player: value }));
            setValue('');
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
        <>
          <div className="Candidates-players">
            {players.map((player) => (
              <React.Fragment key={`player-${slugify(player)}`}>
                <Player player={player} />
              </React.Fragment>
            ))}
          </div>
          <button
            onClick={generateSecretSanta}
            disabled={players.length <= 1}
            className="Button"
          >
            <IconCheck />
            <span>Générer la liste</span>
          </button>
        </>
      ) : (
        <p className="Candidates-emptyList">
          Aucun participant n'a encore été saisi.
        </p>
      )}
    </div>
  );
};

export default Candidates;
