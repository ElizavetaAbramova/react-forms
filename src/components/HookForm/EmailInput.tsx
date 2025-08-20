import type { InputProps } from '../../types&interfaces/InputProps';

export default function EmailInput({ value, onChange, children }: InputProps) {
  return (
    <div className="email-input">
      <label htmlFor="email">Email</label>
      <input
        id="email"
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
