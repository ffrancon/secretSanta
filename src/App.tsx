import List from "./components/List/List.jsx";
import { useState } from "react";
import PlayersContext from "./context/players.js";
import Selection from "./components/Selection/Selection.jsx";
import { ReactComponent as IconSanta } from "@icons/santa.svg";
import { ReactComponent as IconPresent } from "@icons/present.svg";

export default function App() {
  const [players, setPlayers] = useState<string[]>([]);

  return (
    <div className="App">
      <header className="Header">
        <IconSanta />
        <p>
          <span className="Header--primary">Secret</span>{" "}
          <span className="Header--secondary">Santa</span>
        </p>
        <IconPresent />
      </header>
      <PlayersContext.Provider value={{ players, setPlayers }}>
        <div className="App-container">
          <List />
          {players.length > 1 && <Selection />}
        </div>
      </PlayersContext.Provider>
    </div>
  );
}
