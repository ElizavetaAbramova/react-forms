import type { UncontrolledInputProps } from '../../types&interfaces/UncontrolledInputProps';

export default function EmailInput({
  children,
  ...rest
}: UncontrolledInputProps) {
  return (
    <div className="email-input">
      <label htmlFor="email">Email</label>
      <input id="email" type="text" autoComplete="off" {...rest} />
      {children}
    </div>
  );
}
