import type { ReactNode } from 'react';

interface ModalProps {
  open: boolean;
  children: ReactNode;
}

function Modal({ open, children }: ModalProps) {
  if (!open) return null;

  return <div>{children}</div>;
}

export default Modal;
