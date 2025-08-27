import { Suspense, useState, type BaseSyntheticEvent } from 'react';
import '../styles/main-page.css';
import { Loader } from '../components/Loader';
import Table from '../components/Table';
import Select, { type SingleValue } from 'react-select';
import type { ExtraData } from '../types&interfaces/CO2Response';

interface Option {
  value: number;
  label: string;
}

const availableColumns: ExtraData[] = [
  'methane',
  'oil_co2',
  'temperature_change_from_co2',
  'cement_co2',
  'cement_co2_per_capita',
];

function MainPage() {
  const lastYear: Option = { value: 2023, label: '2023' };
  const [year, setYear] = useState<Option>(lastYear);
  const yearsOptions: Option[] = [];
  const [selectedColumns, setSelectedColumns] = useState<ExtraData[]>([]);
  const [tempColumns, setTempColumns] = useState<ExtraData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  for (let i = lastYear.value; i >= 1750; i--) {
    yearsOptions.push({ value: i, label: i.toString() });
  }

  const handleSelectYear = (newValue: SingleValue<Option>) => {
    if (newValue) {
      setYear(newValue);
    }
  };

  const toggleColumn = (col: ExtraData) => {
    setTempColumns((prevCols) =>
      prevCols.includes(col)
        ? prevCols.filter((prev) => prev !== col)
        : [...prevCols, col]
    );
  };

  const handleApplyExtraCol = () => {
    if (tempColumns.length > 0) {
      setSelectedColumns(tempColumns);
      setIsModalOpen(false);
    }
  };

  const handleCloseModal = (event: BaseSyntheticEvent) => {
    if (
      event.target.className === 'modal-background' ||
      event.target.innerText === 'Cancel'
    ) {
      setIsModalOpen(false);
    }
  };

  return (
    <div className="main-page">
      <h1>CO2 Emissions</h1>
      <div className="flex">
        <div className="w-50 flex items-center gap-2">
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
        <button onClick={() => setIsModalOpen(true)}>Table options</button>
      </div>

      {isModalOpen && (
        <div className="modal-background" onClick={handleCloseModal}>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Select columns</h2>
            <div className="space-y-2">
              {availableColumns.map((col) => (
                <label key={col} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={tempColumns.includes(col)}
                    onChange={() => toggleColumn(col)}
                  />
                  {col}
                </label>
              ))}
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-600 rounded"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 rounded"
                onClick={handleApplyExtraCol}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
      <Suspense fallback={<Loader></Loader>}>
        <Table year={year.value} extraColumns={selectedColumns} />
      </Suspense>
    </div>
  );
}

export default MainPage;
