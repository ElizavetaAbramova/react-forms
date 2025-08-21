import '../styles/main-page.css';
import { useState } from 'react';
import Modal from '../components/modal/Modal';
import HookForm from '../components/HookForm/Form';
import UncontrolledForm from '../components/UncontrolledForm/Form';

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
    <div className="main-page">
      <div className="buttons-block">
        <button onClick={() => handleClick('hook')}>Open RHF</button>
        <button onClick={() => handleClick('uncontrolled')}>
          Open uncontrolled
        </button>
      </div>
      <div className="content-block"></div>

      <Modal open={isOpen} close={handleClose}>
        <span>Please, fill up the form</span>
        {modalType === 'hook' && <HookForm></HookForm>}
        {modalType === 'uncontrolled' && <UncontrolledForm></UncontrolledForm>}
        <button onClick={handleClose} className="close-button">
          Close
        </button>
      </Modal>
    </div>
  );
}

export default MainPage;
