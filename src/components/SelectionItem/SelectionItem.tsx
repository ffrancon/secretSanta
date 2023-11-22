import { useEffect, useState } from "react";
import "./SelectionItem.css";
import { ReactComponent as IconCopy } from "@icons/copy.svg";

const SelectionItem = ({
  giver,
  receiver,
}: {
  giver: string;
  receiver: string;
}) => {
  const [copied, setCopied] = useState(false);
  const copyText = () => {
    navigator.clipboard.writeText(
      `Bonjour ${giver} ! Pour le Secret Santa de cette année tu devras offrir un cadeau à ${receiver}`
    );
    setCopied(true);
  };

  useEffect(() => {
    if (copied)
      setTimeout(() => {
        setCopied(false);
      }, 2000);
  }, [copied]);

  return (
    <div className="SelectionItem">
      <div>
        <b>{giver}</b> offre à <b>{receiver}</b>
      </div>
      <div className="SelectionItem-buttonContainer">
        {copied && <p className="SelectionItem-copied">Message copié</p>}
        <button
          aria-label="copy"
          onClick={copyText}
          className="SelectionItem-button"
        >
          <IconCopy />
        </button>
      </div>
    </div>
  );
};

export default SelectionItem;
