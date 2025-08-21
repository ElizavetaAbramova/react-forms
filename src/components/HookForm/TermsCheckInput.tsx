import type { ReactNode } from 'react';

interface Props {
  onChange: (value: boolean) => void;
  children?: ReactNode;
}

export default function TermsCheckInput({ onChange, children }: Props) {
  return (
    <div className="terms-input">
      <label htmlFor="check">
        I accept
        <a href="https://t-j.ru/guide/fake-identity/" target="_blank">
          {' '}
          Terms and Conditions
        </a>
      </label>
      <input
        id="check"
        type="checkbox"
        onChange={(event) => {
          onChange(event.target.checked);
        }}
      />
      {children}
    </div>
  );
}
