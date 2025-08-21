import type { ReactNode } from 'react';

interface PasswordProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  children?: ReactNode;
}
export default function PasswordInput({
  label,
  value,
  onChange,
  children,
}: PasswordProps) {
  const className = label.includes('Confirm')
    ? 'confirm-password-input'
    : 'password-input';

  return (
    <div className={className}>
      <label
        htmlFor={label.includes('Confirm') ? 'confirmPassword' : 'password'}
      >
        {label}
      </label>
      <input
        value={value}
        id={label.includes('Confirm') ? 'confirmPassword' : 'password'}
        type="password"
        onChange={(event) => {
          onChange(event.target.value);
        }}
      />
      {children}
    </div>
  );
}
