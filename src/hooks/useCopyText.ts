import { useEffect, useState } from "react";

export const useCopyText = (text: string) => {
  const [isCopied, setIsCopied] = useState(false);
  const copyText = () => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
  };

  useEffect(() => {
    if (isCopied)
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
  }, [isCopied]);

  return {
    isCopied,
    copyText,
  };
};
