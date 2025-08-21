import { useSelector } from 'react-redux';
import type { InputProps } from '../../types&interfaces/InputProps';
import type { RootState } from '../../store/store';
import { useState, type BaseSyntheticEvent } from 'react';

export default function CountryInput({
  value,
  onChange,
  children,
}: InputProps) {
  const countries: string[] = useSelector(
    (state: RootState) => state.countries
  );
  const [filtered, setFiltered] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleCountryChange = (event: BaseSyntheticEvent) => {
    const input = event.target.value;
    onChange(input);
    if (input.length > 0) {
      const filteredCountryList = countries.filter((country: string) =>
        country.toLowerCase().startsWith(input.toLowerCase())
      );
      setFiltered(filteredCountryList);
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  const selectCountry = (country: string) => {
    onChange(country);
    setIsOpen(false);
  };

  return (
    <div className="country-input">
      <label htmlFor="country">Country</label>
      <input
        id="country"
        type="text"
        value={value}
        onChange={handleCountryChange}
        autoComplete="off"
      />
      {isOpen && filtered.length > 0 && (
        <div className="country-list">
          {filtered.map((country) => (
            <p key={country} onClick={() => selectCountry(country)}>
              {country}
            </p>
          ))}
        </div>
      )}
      {children}
    </div>
  );
}
