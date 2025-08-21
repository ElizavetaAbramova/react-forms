import type { ReactNode } from 'react';

interface PasswordProps {
  label: string;
  children?: ReactNode;
}

export default function PasswordInput({
  label,
  children,
  ...rest
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
        id={label.includes('Confirm') ? 'confirmPassword' : 'password'}
        type="password"
        {...rest}
      />
      {children}
    </div>
  );
}
