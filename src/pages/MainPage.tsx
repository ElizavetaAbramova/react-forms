import { Suspense, useState } from 'react';
import '../styles/main-page.css';
import { Loader } from '../components/Loader';
import Table from '../components/Table';
import Select, { type SingleValue } from 'react-select';

interface Option {
  value: number;
  label: string;
}

function MainPage() {
  const lastYear: Option = { value: 2023, label: '2023' };
  const [year, setYear] = useState<Option>(lastYear);
  const yearsOptions: Option[] = [];

  for (let i = lastYear.value; i >= 1750; i--) {
    yearsOptions.push({ value: i, label: i.toString() });
  }

  const handleSelectYear = (newValue: SingleValue<Option>) => {
    if (newValue) {
      setYear(newValue);
    }
  };

  return (
    <div className="main-page">
      <h1>CO2 Emissions</h1>
      <div className="w-70 flex items-center gap-2">
        <label htmlFor="year">Select year:</label>
        <Select
          onChange={handleSelectYear}
          defaultValue={year}
          inputId="year"
          options={yearsOptions}
          theme={(theme) => ({
            ...theme,
            borderRadius: 0,
            colors: {
              ...theme.colors,
              primary25: '#919090ff',
              primary: '#919090ff',
              neutral0: '#353535ff',
              neutral80: '#f0f0f0ff',
            },
          })}
        ></Select>
      </div>
      <Suspense fallback={<Loader></Loader>}>
        <Table year={year.value} />
      </Suspense>
    </div>
  );
}

export default MainPage;
