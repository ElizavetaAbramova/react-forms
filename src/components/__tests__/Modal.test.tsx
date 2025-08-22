import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Modal from '../modal/Modal';
import '@testing-library/jest-dom';

describe('Modal component', () => {
  beforeEach(() => {
    const portalRoot = document.createElement('div');
    portalRoot.setAttribute('id', 'portal');
    document.body.appendChild(portalRoot);
  });

  it('renders content when open=true', () => {
    render(
      <Modal open={true} close={() => vi.fn()}>
        <span>Modal content</span>
      </Modal>
    );

    expect(screen.getByText(/modal content/i)).toBeInTheDocument();
  });

  it('does not render when open=false', () => {
    render(
      <Modal open={false} close={() => vi.fn()}>
        <span>Hidden</span>
      </Modal>
    );

    expect(screen.queryByText(/hidden/i)).not.toBeInTheDocument();
  });

  it('calls close when outside click', async () => {
    const onClose = vi.fn();

    render(
      <Modal open={true} close={onClose}>
        <span>Inside modal</span>
      </Modal>
    );
    const overlay = screen
      .getByRole('dialog')
      .querySelector('.overlay') as HTMLElement;

    await userEvent.click(overlay);

    expect(onClose).toHaveBeenCalled();
  });

  it('calls close when pressing ESC', async () => {
    const onClose = vi.fn();

    render(
      <Modal open={true} close={onClose}>
        <span>Escape me</span>
      </Modal>
    );

    await userEvent.keyboard('{Escape}');

    expect(onClose).toHaveBeenCalled();
  });

  it('renders into portal container', () => {
    const { container } = render(
      <Modal open={true} close={() => {}}>
        <span>Portal check</span>
      </Modal>
    );

    const portalRoot = document.getElementById('portal');
    expect(portalRoot).toContainElement(screen.getByText(/portal check/i));
    expect(container).not.toContainElement(screen.getByText(/portal check/i));
  });

  it('sets correct accessibility attributes', () => {
    render(
      <Modal open={true} close={() => vi.fn()}>
        <span>Accessible</span>
      </Modal>
    );

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal');
  });
});
