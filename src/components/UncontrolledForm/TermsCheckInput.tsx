import type { UncontrolledInputProps } from '../../types&interfaces/UncontrolledInputProps';

export default function TermsCheckInput({
  children,
  ...rest
}: UncontrolledInputProps) {
  return (
    <div className="terms-input">
      <label htmlFor="check">
        I accept
        <a href="https://t-j.ru/guide/fake-identity/" target="_blank">
          {' '}
          Terms and Conditions
        </a>
      </label>
      <input id="check" type="checkbox" {...rest} />
      {children}
    </div>
  );
}
