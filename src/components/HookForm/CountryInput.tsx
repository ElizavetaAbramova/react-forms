// import { useSelector } from 'react-redux';
// import type { RootState } from '../../store/store';
// import { useState } from 'react';
import type { InputProps } from '../../types&interfaces/InputProps';

export default function CountryInput({
  value,
  onChange,
  children,
}: InputProps) {
  // const countries = useSelector((state: RootState) => state.countries);
  // const [showSuggestions, setShowSuggestions] = useState(false);

  // const filtered = countries.filter((country) =>
  //   country.toLowerCase().includes(value.toLowerCase())
  // );

  return (
    <div className="country-input">
      <label htmlFor="country">Country</label>
      <input
        id="country"
        type="text"
        value={value}
        onChange={(event) => {
          onChange(event.target.value);
          // setShowSuggestions(true);
        }}
        // onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        autoComplete="off"
      />
      {/* {showSuggestions && filtered.length > 0 && (
        <ul>
          {filtered.map((country) => (
            <li
              key={country}
              onMouseDown={() => {
                onChange(country);
                setShowSuggestions(false);
              }}
            >
              {country}
            </li>
          ))}
        </ul>
      )} */}
      {children}
    </div>
  );
}
