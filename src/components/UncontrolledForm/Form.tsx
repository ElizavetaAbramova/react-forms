import '../../styles/form.css';
import CountryInput from './CountryInput';
import NameInput from './NameInput';
import AgeInput from './AgeInput';
import EmailInput from './EmailInput';
import PhotoInput from './PhotoInput';
import GenderInput from './GenderInput';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { schema } from '../../formValidation/validationSchema';
import type { FormValues } from '../../types&interfaces/FormValues';
import TermsCheckInput from './TermsCheckInput';
import PasswordInput from './PasswordInput';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { useEffect, useState } from 'react';

export default function UncontrolledForm() {
  const countries = useSelector((state: RootState) => state.countries);
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const [isOpen, setIsOpen] = useState(false);
  const countryValue = watch('country');
  const filtered = countries.filter((country) =>
    country.toLowerCase().startsWith(countryValue?.toLowerCase() ?? '')
  );
  const selectCountry = (country: string) => {
    setIsOpen(false);
    setValue('country', country, { shouldValidate: true });
  };

  const getData: SubmitHandler<FormValues> = (data) => {
    console.log('ok');
    console.log(data);
  };

  useEffect(() => {
    if (
      countryValue &&
      filtered.length > 0 &&
      !filtered.includes(countryValue)
    ) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [countryValue, filtered]);

  return (
    <form className="form" onSubmit={handleSubmit(getData)}>
      <NameInput {...register('name')}>
        {errors.name ? (
          <span className="error-message">{errors.name.message}</span>
        ) : (
          <span className="error-message"></span>
        )}
      </NameInput>
      <AgeInput {...register('age')}>
        {errors.age ? (
          <span className="error-message">{errors.age.message}</span>
        ) : (
          <span className="error-message"></span>
        )}
      </AgeInput>
      <EmailInput {...register('email')}>
        {errors.email ? (
          <span className="error-message">{errors.email.message}</span>
        ) : (
          <span className="error-message"></span>
        )}
      </EmailInput>
      <CountryInput {...register('country')}>
        {errors.country ? (
          <span className="error-message">{errors.country.message}</span>
        ) : (
          <span className="error-message"></span>
        )}
        {isOpen && filtered.length > 0 && (
          <div className="country-list">
            {filtered.map((country) => (
              <p key={country} onClick={() => selectCountry(country)}>
                {country}
              </p>
            ))}
          </div>
        )}
      </CountryInput>
      <GenderInput {...register('gender')}>
        {errors.gender ? (
          <span className="error-message">{errors.gender.message}</span>
        ) : (
          <span className="error-message"></span>
        )}
      </GenderInput>
      <PhotoInput {...register('photo')}>
        {errors.photo ? (
          <span className="error-message">{errors.photo.message}</span>
        ) : (
          <span className="error-message"></span>
        )}
      </PhotoInput>
      <PasswordInput label="Password" {...register('password')}>
        {errors.password ? (
          <span className="error-message">{errors.password.message}</span>
        ) : (
          <span className="error-message"></span>
        )}
      </PasswordInput>
      <PasswordInput label="Confirm Password" {...register('confirmPassword')}>
        {errors.confirmPassword ? (
          <span className="error-message">
            {errors.confirmPassword.message}
          </span>
        ) : (
          <span className="error-message"></span>
        )}
      </PasswordInput>
      <TermsCheckInput {...register('terms')}>
        {errors.terms ? (
          <span className="error-message">{errors.terms.message}</span>
        ) : (
          <span className="error-message"></span>
        )}
      </TermsCheckInput>

      <button type="submit" className="submit-button">
        Send
      </button>
    </form>
  );
}
