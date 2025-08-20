import type { ReactNode } from 'react';

type PhotoInputProps = {
  onChange: (value: string) => void;
  children?: ReactNode;
};

export default function PhotoInput({ onChange, children }: PhotoInputProps) {
  return (
    <div className="photo-input">
      <label htmlFor="photo">Photo</label>
      <input
        accept="image/png, image/jpeg"
        id="photo"
        type="file"
        onChange={(event) => {
          onChange(event.target.value);
        }}
        onBlur={() => console.log('blur')}
      />
      {children}
    </div>
  );
}
