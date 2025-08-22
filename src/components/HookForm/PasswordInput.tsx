import type { ReactNode } from 'react';

interface PasswordProps {
  value: string;
  onChange: (value: string) => void;
  children?: ReactNode;
}

export default function PasswordInput({
  value,
  onChange,
  children,
}: PasswordProps) {
  return (
    <div className="password-input">
      <label htmlFor="password">Password</label>
      <input
        value={value}
        id="password"
        type="password"
        onChange={(event) => {
          onChange(event.target.value);
        }}
      />
      {children}
    </div>
  );
}
