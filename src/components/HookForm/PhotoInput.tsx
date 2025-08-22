import type { BaseSyntheticEvent, ReactNode } from 'react';
import { useDispatch } from 'react-redux';
import { setPhoto } from '../../store/photoSlice';

type PhotoInputProps = {
  onChange: (value: FileList) => void;
  children?: ReactNode;
};

export default function PhotoInput({ onChange, children }: PhotoInputProps) {
  const dispatch = useDispatch();
  const handlePhotoChange = (event: BaseSyntheticEvent) => {
    if (event.target.files) {
      const file = event.target.files[0];
      onChange(event.target.files);
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          const base64String: string = reader.result;
          dispatch(setPhoto(base64String));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="photo-input">
      <label htmlFor="photo">Photo</label>
      <input
        accept="image/png, image/jpeg"
        id="photo"
        type="file"
        onChange={handlePhotoChange}
      />
      {children}
    </div>
  );
}
