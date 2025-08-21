import type { UncontrolledInputProps } from '../../types&interfaces/UncontrolledInputProps';

export default function AgeInput({
  children,
  ...rest
}: UncontrolledInputProps) {
  return (
    <div className="age-input">
      <label htmlFor="age">Age</label>
      <input id="name" type="number" autoComplete="off" {...rest} />
      {children}
    </div>
  );
}
