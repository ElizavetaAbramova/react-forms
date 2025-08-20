import React, { useState } from 'react';
import Modal from '../components/modal/Modal';
import HookForm from '../components/HookForm/Form';

type ModalType = 'uncontrolled' | 'hook' | null;

function MainPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(null);

  const handleClick = (modalType: ModalType) => {
    setIsOpen(true);
    setModalType(modalType);
  };

  const handleClose = () => {
    setIsOpen(false);
    setModalType(null);
  };

  return (
    <div>
      <button onClick={() => handleClick('hook')}>Open RHF</button>
      <button onClick={() => handleClick('uncontrolled')}>
        Open uncontrolled
      </button>
      <Modal open={isOpen}>
        <button onClick={handleClose}>Close</button>
        {modalType === 'hook' && <HookForm></HookForm>}
        {modalType === 'uncontrolled' && <p>uncontrolled</p>}
      </Modal>
    </div>
  );
}

export default MainPage;
