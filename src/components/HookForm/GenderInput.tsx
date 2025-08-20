import type { ReactNode } from 'react';

type GenderInputProps = {
  onChange: (value: string) => void;
  children?: ReactNode;
};

export default function GenderInput({ onChange, children }: GenderInputProps) {
  return (
    <div className="gender-input">
      <label htmlFor="gender">Gender</label>
      <div className="gender-input-radio">
        <div>
          <label htmlFor="male">
            <input
              type="radio"
              id="male"
              value="male"
              name="gender"
              onClick={() => {
                onChange('male');
              }}
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
              onClick={() => {
                onChange('female');
              }}
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
              onClick={() => {
                onChange('other');
              }}
            ></input>
            Other
          </label>
        </div>
      </div>
      {children}
    </div>
  );
}
