import './SelectionItem.css';
import IconCopy from '@icons/copy.svg?react';
import { useCopyText } from '@/hooks/useCopyText';
import { useGetMessage } from '@redux/config.slice';

const SelectionItem = ({
  giver,
  receiver,
}: {
  giver: string;
  receiver: string;
}) => {
  const message = useGetMessage();
  const { isCopied, copyText } = useCopyText(message);

  return (
    <div className="SelectionItem">
      <div>
        <b>{giver}</b> offre à <b>{receiver}</b>
      </div>
      <div className="SelectionItem-buttonContainer">
        {isCopied && <p className="SelectionItem-copied">Message copié</p>}
        <button aria-label="copy" onClick={copyText} className="IconButton">
          <IconCopy />
        </button>
      </div>
    </div>
  );
};

export default SelectionItem;
