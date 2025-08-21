import type { UncontrolledInputProps } from '../../types&interfaces/UncontrolledInputProps';

export default function CountryInput({
  children,
  ...rest
}: UncontrolledInputProps) {
  return (
    <div className="country-input">
      <label htmlFor="country">Country</label>
      <input id="country" type="text" {...rest} autoComplete="off" />
      {children}
    </div>
  );
}
