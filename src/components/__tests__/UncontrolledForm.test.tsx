import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import UncontrolledForm from '../UncontrolledForm/Form';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

describe('HookForm', () => {
  it('renders all required fields', () => {
    render(
      <Provider store={store}>
        <UncontrolledForm onClose={vi.fn()} />
      </Provider>
    );
    expect(screen.getByRole('textbox', { name: /name/i })).toBeInTheDocument();
    expect(
      screen.getByRole('spinbutton', { name: /age/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/country/i)).toBeInTheDocument();
    expect(screen.getByText('Gender')).toBeInTheDocument();
    expect(screen.getByLabelText(/photo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/terms/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument();
  });

  it('shows error for empty required fields', async () => {
    render(
      <Provider store={store}>
        <UncontrolledForm onClose={vi.fn()} />
      </Provider>
    );
    await userEvent.click(screen.getByRole('button', { name: /send/i }));
    expect(await screen.findAllByText(/required/i)).toHaveLength(3);
  });

  it('validates email format', async () => {
    render(
      <Provider store={store}>
        <UncontrolledForm onClose={vi.fn()} />
      </Provider>
    );
    await userEvent.type(screen.getByLabelText(/email/i), 'invalid');
    await userEvent.click(screen.getByRole('button', { name: /send/i }));
    expect(await screen.findByText(/invalid email/i)).toBeInTheDocument();
  });

  it('shows error if passwords do not match', async () => {
    render(
      <Provider store={store}>
        <UncontrolledForm onClose={vi.fn()} />
      </Provider>
    );
    await userEvent.type(screen.getByLabelText(/^password$/i), 'Aa12345!');
    await userEvent.type(screen.getByLabelText(/confirm password/i), 'Aa1234');
    await userEvent.type(screen.getByLabelText(/email/i), 'lisa@g.co');
    await userEvent.type(screen.getByLabelText(/name/i), 'Lisa');
    await userEvent.type(screen.getByLabelText(/country/i), 'Lapland');
    await userEvent.click(screen.getByRole('radio', { name: /female/i }));
    await userEvent.click(screen.getByRole('button', { name: /send/i }));
    expect(screen.getByText(/Passwords do not match/i)).toBeInTheDocument();
  });

  it('submits valid data', async () => {
    const handleSubmit = vi.fn();
    const file = new File(['file content'], 'avatar.png', {
      type: 'image/png',
    });
    render(
      <Provider store={store}>
        <UncontrolledForm onClose={handleSubmit} />
      </Provider>
    );

    await userEvent.type(screen.getByLabelText(/name/i), 'Lisa');
    await userEvent.type(screen.getByLabelText(/email/i), 'lisa@g.co');
    await userEvent.type(screen.getByLabelText(/age/i), '22');
    await userEvent.type(screen.getByLabelText(/country/i), 'Lapland');
    await userEvent.click(screen.getByRole('radio', { name: /female/i }));
    await userEvent.upload(screen.getByLabelText(/photo/i), file);
    await userEvent.type(screen.getByLabelText(/^password$/i), 'Aa12345!');
    await userEvent.type(
      screen.getByLabelText(/confirm password/i),
      'Aa12345!'
    );
    await userEvent.click(screen.getByRole('checkbox'));
    await userEvent.click(screen.getByRole('button', { name: /send/i }));

    expect(handleSubmit).toHaveBeenCalled();
  });
});
