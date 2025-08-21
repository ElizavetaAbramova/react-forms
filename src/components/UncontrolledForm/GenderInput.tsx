import type { UncontrolledInputProps } from '../../types&interfaces/UncontrolledInputProps';

export default function GenderInput({
  children,
  ...rest
}: UncontrolledInputProps) {
  return (
    <div className="gender-input">
      <span>Gender</span>
      <div className="gender-input-radio">
        <div>
          <label htmlFor="male">
            <input
              type="radio"
              id="male"
              value="male"
              name="gender"
              {...rest}
            ></input>
            Male
          </label>
        </div>
        <div>
          <label htmlFor="female">
            <input
              type="radio"
              id="female"
              value="female"
              name="gender"
              {...rest}
            ></input>
            Female
          </label>
        </div>
        <div>
          <label htmlFor="other">
            <input
              type="radio"
              id="other"
              value="other"
              name="gender"
              {...rest}
            ></input>
            Other
          </label>
        </div>
      </div>
      {children}
    </div>
  );
}
