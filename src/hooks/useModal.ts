import { useState } from 'react';
import ReactDOM from 'react-dom';

export type UseModalReturn = {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  render: (node: React.ReactNode) => React.ReactPortal;
};

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const root = document.getElementById('modal-root') as HTMLDivElement;
  const body = document.querySelector('body') as HTMLBodyElement;

  const openModal = () => {
    if (!isOpen) {
      setIsOpen(true);
      body.classList.add('modal-open');
    }
  };
  const closeModal = () => {
    if (isOpen) {
      setIsOpen(false);
      body.classList.remove('modal-open');
    }
  };

  const render = (node: React.ReactNode) => ReactDOM.createPortal(node, root);

  return { isOpen, openModal, closeModal, render };
};
