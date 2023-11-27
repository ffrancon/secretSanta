import React, { useEffect, useState } from "react";
import { useGetPlayers } from "../../context/players";
import {
  SecretSantaResult,
  generateSecretSantaList,
} from "../../utils/generateSecretSantaList";
import SelectionItem from "../SelectionItem/SelectionItem";
import "./Selection.css";
import { slugify } from "@utils/slugify";
import { ReactComponent as IconCheck } from "@icons/check.svg";
import { ReactComponent as IconCopy } from "@icons/copy.svg";

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

  const [copied, setCopied] = useState(false);
  const copyText = () => {
    navigator.clipboard.writeText(JSON.stringify(secretSanta));
    setCopied(true);
  };

  useEffect(() => {
    if (copied)
      setTimeout(() => {
        setCopied(false);
      }, 2000);
  }, [copied]);

  return (
    <div className="Selection">
      <button
        onClick={generateSecretSanta}
        disabled={players.length <= 1}
        className="Button"
      >
        <IconCheck />
        <span>Générer la liste</span>
      </button>
      <h2 className="Selection-title">Résultat</h2>
      {secretSanta.length > 0 && (
        <>
          <div className="Selection-cards">
            {secretSanta.map(({ giver, receiver }) => (
              <React.Fragment key={`${slugify(giver)}-${slugify(receiver)}`}>
                <SelectionItem giver={giver} receiver={receiver} />
              </React.Fragment>
            ))}
          </div>
          <button className="Button" onClick={copyText}>
            <IconCopy />
            <span>Copier la liste</span>
          </button>
          {copied && <p className="Selection-copied">Liste copiée</p>}
        </>
      )}
    </div>
  );
};

export default Selection;
