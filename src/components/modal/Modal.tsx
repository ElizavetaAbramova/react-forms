import '../../styles/modal.css';
import { useEffect, type ReactNode } from 'react';
import ReactDOM from 'react-dom';
interface ModalProps {
  open: boolean;
  children: ReactNode;
  close: () => void;
}

function Modal({ open, children, close }: ModalProps) {
  useEffect(() => {
    if (open) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          close();
        }
      };
      document.addEventListener('keydown', handleKeyDown);

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [open, close]);

  if (!open) return null;

  return ReactDOM.createPortal(
    <div role="dialog" aria-modal>
      <div className="overlay" onClick={close}></div>
      <div className="modal">{children}</div>
    </div>,
    document.getElementById('portal') as HTMLElement
  );
}

export default Modal;
