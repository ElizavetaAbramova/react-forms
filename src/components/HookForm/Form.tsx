import '../../styles/form.css';
import CountryInput from './CountryInput';
import NameInput from './NameInput';
import AgeInput from './AgeInput';
import EmailInput from './EmailInput';
import PhotoInput from './PhotoInput';
import GenderInput from './GenderInput';
import { Controller, useForm } from 'react-hook-form';
import { schema } from '../../formValidation/validationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import PasswordInput from './PasswordInput';
import TermsCheckInput from './TermsCheckInput';
import type { FormValues } from '../../types&interfaces/FormValues';
import { useDispatch } from 'react-redux';
import { setProfile } from '../../store/profileSlice';
import type { Profile } from '../../types&interfaces/Profile';
interface Props {
  onClose: () => void;
}

export default function HookForm({ onClose }: Props) {
  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'all',
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      age: '',
      email: '',
      country: '',
      password: '',
      confirmPassword: '',
      terms: false,
    },
  });

  const getData = (data: FormValues) => {
    const file = data.photo[0];

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        const base64String: string = reader.result;
        const profile: Profile = { ...data, photo: base64String };
        dispatch(setProfile(profile));
      }
    };
    reader.readAsDataURL(file);

    onClose();
  };

  const buttonClass =
    Object.keys(errors).length > 0 ? 'submit-button disabled' : 'submit-button';

  return (
    <form className="form" onSubmit={handleSubmit(getData)}>
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <NameInput value={field.value} onChange={field.onChange}>
            {errors.name ? (
              <span className="error-message">{errors.name.message}</span>
            ) : (
              <span className="error-message"></span>
            )}
          </NameInput>
        )}
      ></Controller>

      <Controller
        name="age"
        control={control}
        render={({ field }) => (
          <AgeInput value={field.value} onChange={field.onChange}>
            {errors.age ? (
              <span className="error-message">{errors.age.message}</span>
            ) : (
              <span className="error-message"></span>
            )}
          </AgeInput>
        )}
      ></Controller>

      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <EmailInput value={field.value} onChange={field.onChange}>
            {errors.email ? (
              <span className="error-message">{errors.email.message}</span>
            ) : (
              <span className="error-message"></span>
            )}
          </EmailInput>
        )}
      ></Controller>

      <Controller
        name="country"
        control={control}
        render={({ field }) => (
          <CountryInput value={field.value} onChange={field.onChange}>
            {errors.country ? (
              <span className="error-message">{errors.country.message}</span>
            ) : (
              <span className="error-message"></span>
            )}
          </CountryInput>
        )}
      ></Controller>

      <Controller
        name="gender"
        control={control}
        render={({ field }) => (
          <GenderInput onChange={field.onChange}>
            {errors.gender ? (
              <span className="error-message">{errors.gender.message}</span>
            ) : (
              <span className="error-message"></span>
            )}
          </GenderInput>
        )}
      ></Controller>

      <Controller
        name="photo"
        control={control}
        render={({ field }) => (
          <PhotoInput onChange={field.onChange}>
            {errors.photo ? (
              <span className="error-message">{errors.photo.message}</span>
            ) : (
              <span className="error-message"></span>
            )}
          </PhotoInput>
        )}
      ></Controller>

      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <PasswordInput
            label={'Password'}
            value={field.value}
            onChange={field.onChange}
          >
            {errors.password ? (
              <span className="error-message">{errors.password.message}</span>
            ) : (
              <span className="error-message"></span>
            )}
          </PasswordInput>
        )}
      ></Controller>

      <Controller
        name="confirmPassword"
        control={control}
        render={({ field }) => (
          <PasswordInput
            label="Confirm password"
            value={field.value}
            onChange={field.onChange}
          >
            {errors.confirmPassword ? (
              <span className="error-message">
                {errors.confirmPassword.message}
              </span>
            ) : (
              <span className="error-message"></span>
            )}
          </PasswordInput>
        )}
      ></Controller>

      <Controller
        name="terms"
        control={control}
        render={({ field }) => (
          <TermsCheckInput onChange={field.onChange}>
            {errors.terms ? (
              <span className="error-message">{errors.terms.message}</span>
            ) : (
              <span className="error-message"></span>
            )}
          </TermsCheckInput>
        )}
      ></Controller>

      <button type="submit" className={buttonClass}>
        Send
      </button>
    </form>
  );
}
