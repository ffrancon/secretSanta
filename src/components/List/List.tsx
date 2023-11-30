import React, { useState } from "react";
import { useGetPlayersContext } from "@context/players";
import Player from "../Player/Player";
import "./List.css";
import { ReactComponent as IconAdd } from "@icons/add.svg";
import { slugify } from "@utils/slugify";

type ActionParams = {
  action: string;
  player: string;
  newValue?: string;
};

const getUpdatedPlayers = (
  players: string[],
  { action, player, newValue = "" }: ActionParams
) => {
  const newPlayers = [...players];
  if (!player) return null;
  switch (action) {
    case "add": {
      if (!players.includes(player)) newPlayers.push(player);
      return newPlayers;
    }
    case "remove": {
      const index = players.indexOf(player);
      newPlayers.splice(index, 1);
      return newPlayers;
    }
    case "edit": {
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

const List = () => {
  const [value, setValue] = useState("");
  const { players, setPlayers } = useGetPlayersContext();

  const updatePlayers = ({ action, player, newValue }: ActionParams) => {
    const updatedPlayers = getUpdatedPlayers(players, {
      action,
      player,
      newValue,
    });
    if (!!updatedPlayers) {
      setPlayers(updatedPlayers);
      setValue("");
    }
  };

  return (
    <div className="List">
      <div className="List-inputContainer">
        <input
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          onKeyDown={(e) => {
            const targetValue = (e.target as HTMLInputElement).value;
            if (e.key === "Enter" && !!targetValue) {
              updatePlayers({ action: "add", player: targetValue });
            }
          }}
          className="List-input"
        />
        <button
          className="List-addButton"
          onClick={() => {
            updatePlayers({ action: "add", player: value });
          }}
        >
          <IconAdd />
        </button>
      </div>
      <h2 className="List-title">
        Liste des participants
        {players.length > 0 ? ` (${players.length})` : ""}
      </h2>
      {players.length > 0 ? (
        <div className="List-players">
          {players.map((p) => (
            <React.Fragment key={`player-${slugify(p)}`}>
              <Player player={p} updatePlayers={updatePlayers} />
            </React.Fragment>
          ))}
        </div>
      ) : (
        <p className="List-emptyList">
          Aucun participant n'a encore été saisi.
        </p>
      )}
    </div>
  );
};

export default List;
