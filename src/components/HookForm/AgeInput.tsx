import type { InputProps } from '../../types&interfaces/InputProps';

export default function AgeInput({ value, onChange, children }: InputProps) {
  return (
    <div className="age-input">
      <label htmlFor="age">Age</label>
      <input
        id="age"
        type="number"
        value={value}
        onChange={(event) => {
          onChange(event.target.value);
        }}
      />
      {children}
    </div>
  );
}
