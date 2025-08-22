import type { ReactNode } from 'react';

interface PasswordProps {
  value: string;
  onChange: (value: string) => void;
  children?: ReactNode;
}

export default function ConfirmPasswordInput({
  value,
  onChange,
  children,
}: PasswordProps) {
  return (
    <div className="confirm-password-input">
      <label htmlFor="confirmPassword">Confirm password</label>
      <input
        value={value}
        id="confirmPassword"
        type="password"
        onChange={(event) => {
          onChange(event.target.value);
        }}
      />
      {children}
    </div>
  );
}
