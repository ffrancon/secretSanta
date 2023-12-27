import React from 'react';
import IconCross from '@icons/cross.svg?react';
import './Modal.css';
import { UseModalReturn } from '@/hooks/useModal';

type ModalProps = {
  children: React.ReactNode;
  modal: UseModalReturn;
  validate: () => void;
};

const Modal = ({ children, modal, validate }: ModalProps) => {
  const { closeModal, render } = modal;

  const modalRender = (
    <div className="Modal">
      <div className="Modal-container">
        <button className="IconButton Modal-closeButton" onClick={closeModal}>
          <IconCross />
        </button>
        <div className="Modal-content">{children}</div>
        <div className="Modal-footer">
          <button className="Button" onClick={validate}>
            Valider
          </button>
        </div>
      </div>
    </div>
  );

  return render(modalRender);
};

export default Modal;
