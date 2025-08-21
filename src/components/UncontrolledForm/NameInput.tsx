import type { UncontrolledInputProps } from '../../types&interfaces/UncontrolledInputProps';

export default function NameInput({
  children,
  ...rest
}: UncontrolledInputProps) {
  return (
    <div className="name-input">
      <label htmlFor="name">Name</label>
      <input id="name" type="text" autoComplete="off" autoFocus {...rest} />
      {children}
    </div>
  );
}
