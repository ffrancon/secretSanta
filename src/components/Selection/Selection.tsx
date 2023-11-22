import React, { useEffect, useState } from "react";
import { useGetPlayers } from "../../context/players";
import {
  SecretSantaResult,
  generateSecretSantaList,
} from "../../utils/generateSecretSantaList";
import SelectionItem from "../SelectionItem/SelectionItem";
import "./Selection.css";
import { slugify } from "@utils/slugify";

const Selection = () => {
  const players = useGetPlayers();
  const [secretSanta, setSecretSanta] = useState<SecretSantaResult>([]);
  const generateSecretSanta = () => {
    const selection = generateSecretSantaList(players);
    setSecretSanta(selection);
  };

  useEffect(() => {
    setSecretSanta([]);
  }, [players]);

  return (
    <div className="Selection">
      <button
        onClick={generateSecretSanta}
        disabled={players.length <= 1}
        className="Button"
      >
        Générer la liste
      </button>
      <h2 className="Selection-title">Résultat</h2>
      <div className="Selection-cards">
        {secretSanta.map(({ giver, receiver }) => (
          <React.Fragment key={`${slugify(giver)}-${slugify(receiver)}`}>
            <SelectionItem giver={giver} receiver={receiver} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Selection;
