import { useDispatch } from 'react-redux';
import type { UncontrolledInputProps } from '../../types&interfaces/UncontrolledInputProps';
import type { BaseSyntheticEvent } from 'react';
import { setPhoto } from '../../store/photoSlice';

export default function PhotoInput({
  children,
  ...rest
}: UncontrolledInputProps) {
  const dispatch = useDispatch();
  const handlePhotoChange = (event: BaseSyntheticEvent) => {
    if (event.target.files) {
      const file = event.target.files[0];
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
        {...rest}
      />
      {children}
    </div>
  );
}
