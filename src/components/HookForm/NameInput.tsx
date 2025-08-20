import type { InputProps } from '../../types&interfaces/InputProps';
// import { Controller, Control } from 'react-hook-form';

export default function NameInput({ value, onChange, children }: InputProps) {
  return (
    <div className="name-input">
      <label htmlFor="name">Name</label>
      <input
        id="name"
        type="text"
        value={value}
        onChange={(event) => {
          onChange(event.target.value);
        }}
        onBlur={() => console.log('blur')}
      />
      {children}
    </div>
  );
}
