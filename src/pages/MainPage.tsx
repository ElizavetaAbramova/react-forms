import { Suspense, useState, type BaseSyntheticEvent } from 'react';
import '../styles/main-page.css';
import { Loader } from '../components/Loader';
import Table from '../components/Table';

function MainPage() {
  const [year, setYear] = useState(2023);

  const handleSelectYear = (event: BaseSyntheticEvent) => {
    setYear(Number(event.target.value));
  };

  return (
    <div className="main-page">
      <h1>CO2 Emissions</h1>
      <select
        name="years"
        id="years"
        className="bg-gray-700"
        value={year}
        onChange={handleSelectYear}
      >
        <option value="2023">2023</option>
        <option value="2022">2022</option>
        <option value="1780">1780</option>
      </select>
      <Suspense fallback={<Loader></Loader>}>
        <Table year={year} />
      </Suspense>
    </div>
  );
}

export default MainPage;
