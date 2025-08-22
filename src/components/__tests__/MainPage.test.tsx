import { describe, expect, it } from 'vitest';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import MainPage from '../../pages/MainPage';

describe('Main page', () => {
  it('renders buttons', () => {
    render(
      <Provider store={store}>
        <MainPage />
      </Provider>
    );
    expect(document.querySelector('.buttons-block')?.childElementCount).toBe(2);
  });
});
