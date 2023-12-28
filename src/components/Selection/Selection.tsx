import React from 'react';
import SelectionItem from '../SelectionItem/SelectionItem';
import './Selection.css';
import { slugify } from '@utils/slugify';
import IconCopy from '@icons/copy.svg?react';
import { useCopyText } from '@/hooks/useCopyText';
import { useGetResult } from '@redux/config.slice';

const Selection = () => {
  const result = useGetResult();
  const { isCopied, copyText } = useCopyText(JSON.stringify(result));

  if (result.length === 0) {
    return null;
  }

  return (
    <div className="Selection">
      <h2 className="Selection-title">Résultat</h2>
      {result.length > 0 && (
        <>
          <div className="Selection-cards">
            {result.map(({ giver, receiver }) => (
              <React.Fragment key={`${slugify(giver)}-${slugify(receiver)}`}>
                <SelectionItem giver={giver} receiver={receiver} />
              </React.Fragment>
            ))}
          </div>
          <button className="Button" onClick={copyText}>
            <IconCopy />
            <span>Copier la liste</span>
          </button>
          {isCopied && <p className="Selection-copied">Liste copiée</p>}
        </>
      )}
    </div>
  );
};

export default Selection;
