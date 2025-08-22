import '../styles/main-page.css';
import { useState } from 'react';
import Modal from '../components/modal/Modal';
import HookForm from '../components/HookForm/Form';
import UncontrolledForm from '../components/UncontrolledForm/Form';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import Tile from '../components/Tile';

type ModalType = 'uncontrolled' | 'hook' | null;

function MainPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(null);
  const profiles = useSelector((state: RootState) => state.profiles.list);

  const handleOpen = (modalType: ModalType) => {
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
        <button onClick={() => handleOpen('hook')}>Open RHF</button>
        <button onClick={() => handleOpen('uncontrolled')}>
          Open uncontrolled
        </button>
      </div>
      <div className="content-block">
        {profiles.length > 0 &&
          profiles.map((profile, index) => (
            <Tile key={index} profile={profile}></Tile>
          ))}
      </div>

      <Modal open={isOpen} close={handleClose}>
        <span>Please, fill up the form</span>
        <button onClick={handleClose} className="close-button">
          X
        </button>
        {modalType === 'hook' && <HookForm onClose={handleClose}></HookForm>}
        {modalType === 'uncontrolled' && (
          <UncontrolledForm onClose={handleClose}></UncontrolledForm>
        )}
      </Modal>
    </div>
  );
}

export default MainPage;
