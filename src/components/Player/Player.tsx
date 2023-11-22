import { useState } from "react";
import "./Player.css";
import { ReactComponent as IconCross } from "@icons/cross.svg";
import { ReactComponent as IconEdit } from "@icons/edit.svg";
import { ReactComponent as IconBin } from "@icons/bin.svg";
import { ReactComponent as IconCheck } from "@icons/check.svg";

type PlayerProps = {
  player: string;
  updatePlayers: (...args: any[]) => void;
};

const Player = ({ player, updatePlayers }: PlayerProps) => {
  const [mode, setMode] = useState("display");
  const [value, setValue] = useState(player);

  return (
    <div className="Player">
      {mode === "display" ? (
        <>
          <p>{player}</p>
          <div className="Player-buttons">
            <button
              aria-label="edit"
              onClick={() => {
                setMode("edit");
              }}
              className="Player-button"
            >
              <IconEdit />
            </button>
            <button
              aria-label="delete"
              onClick={() => {
                updatePlayers({ action: "remove", player });
              }}
              className="Player-button"
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
                updatePlayers({ action: "edit", player, newValue: value });
                setMode("display");
              }}
              className="Player-button"
            >
              <IconCheck />
            </button>
            <button
              onClick={() => {
                setValue(player);
                setMode("display");
              }}
              className="Player-button"
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
