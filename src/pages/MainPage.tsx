import '../styles/main-page.css';
import { Loader } from '../components/Loader';
import Table from '../components/Table';
import Select, { type SingleValue } from 'react-select';
import {
  Suspense,
  useCallback,
  useMemo,
  useState,
  type BaseSyntheticEvent,
} from 'react';
import { co2Resource } from '../utils/co2resource';
import type {
  CO2DataResponse,
  YearlyData,
  ExtraData,
  CountryData,
  SortedData,
} from '../types&interfaces/CO2Response';
import Modal from '../components/Modal';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { ErrorBoundary } from '../components/ErrorBoundary';

export type SortTarget = 'country' | 'population';
type SortOrder = 'asc' | 'desc';

interface Option {
  value: number | string;
  label: string;
}

function MainPage() {
  const lastYear: Option = { value: 2023, label: '2023' };
  const [year, setYear] = useState<Option>(lastYear);
  const [selectedColumns, setSelectedColumns] = useState<ExtraData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortTarget, setSortTarget] = useState<SortTarget>('country');
  const [sortOrderCountry, setSortCountryOrder] = useState<SortOrder>('asc');
  const [sortOrderPopulation, setSortPopulationOrder] =
    useState<SortOrder>('asc');
  const [region, setRegion] = useState('');
  const defaultRegion: Option = { value: '', label: 'Select region' };
  const regions = useSelector((state: RootState) => state.regions);
  const [searchCountry, setSearchCountry] = useState('');

  const yearsOptions: Option[] = useMemo(() => {
    const arr: Option[] = [];
    for (let i = Number(lastYear.value); i >= 1750; i--)
      arr.push({ value: i, label: String(i) });
    return arr;
  }, [lastYear.value]);

  const regionOptions: Option[] = [
    { value: 'Asia', label: 'Asia' },
    { value: 'Europe', label: 'Europe' },
    { value: 'Africa', label: 'Africa' },
    { value: 'South America', label: 'South America' },
    { value: 'North America', label: 'North America' },
    { value: 'North Africa', label: 'North Africa' },
    { value: 'Eastern Africa', label: 'Eastern Africa' },
  ];

  const handleSelectYear = useCallback((option: SingleValue<Option>) => {
    if (option) setYear(option);
  }, []);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleSort = useCallback(
    (target: SortTarget) => {
      if (target === 'country') {
        setSortTarget('country');
        setSortCountryOrder(sortOrderCountry === 'asc' ? 'desc' : 'asc');
      }

      if (target === 'population') {
        setSortTarget('population');
        setSortPopulationOrder(sortOrderPopulation === 'asc' ? 'desc' : 'asc');
      }
    },
    [sortOrderCountry, sortOrderPopulation]
  );

  const handleSelectRegion = useCallback((option: SingleValue<Option>) => {
    if (option) setRegion(option.value.toString());
  }, []);

  const handleSearchCountry = useCallback((event: BaseSyntheticEvent) => {
    setSearchCountry(event.target.value);
  }, []);

  const DataSection = () => {
    const raw: CO2DataResponse = co2Resource.read();
    const preparedRows: Record<string, CountryData> = useMemo(() => {
      const result: Record<string, CountryData> = {};

      Object.entries(raw).forEach(([country, countryData]) => {
        const yearlyData = countryData.data.find((d) => d.year === year.value);
        const baseRow = {
          year: Number(year.value),
          population: yearlyData?.population,
          co2: yearlyData?.co2,
          co2_per_capita: yearlyData?.co2_per_capita,
          ...selectedColumns.reduce((acc, col) => {
            acc[col] = yearlyData?.[col];
            return acc;
          }, {} as Partial<YearlyData>),
        };

        result[country] = {
          iso_code: countryData.iso_code,
          data: [baseRow],
        };
      });

      return result;
    }, [raw]);

    const sortedRows: SortedData[] = useMemo(() => {
      let rows: SortedData[] = Object.entries(preparedRows).map(
        ([country, countryData]) => {
          const yearly = countryData.data[0];

          return {
            country,
            iso_code: countryData.iso_code ?? 'N/A',
            year: yearly.year,
            population: yearly.population ?? 'N/A',
            co2: yearly.co2 ?? 'N/A',
            co2_per_capita: yearly.co2_per_capita ?? 'N/A',
            methane: yearly.methane ?? 'N/A',
            oil_co2: yearly.oil_co2 ?? 'N/A',
            temperature_change_from_co2:
              yearly.temperature_change_from_co2 ?? 'N/A',
            cement_co2: yearly.cement_co2 ?? 'N/A',
            cement_co2_per_capita: yearly.cement_co2_per_capita ?? 'N/A',
          };
        }
      );

      if (region !== '') {
        const countriesArray = regions[region];
        rows = rows.filter((data) => countriesArray.includes(data.country));
      }

      if (searchCountry !== '') {
        console.log(searchCountry);
        rows = rows.filter((data) =>
          data.country.toLowerCase().includes(searchCountry.toLowerCase())
        );
      }

      if (sortTarget === 'country') {
        rows.sort((a, b) =>
          sortOrderCountry === 'asc'
            ? a.country.localeCompare(b.country)
            : b.country.localeCompare(a.country)
        );
      }

      if (sortTarget === 'population') {
        rows.sort((a, b) => {
          const popA = typeof a.population === 'number' ? a.population : 0;
          const popB = typeof b.population === 'number' ? b.population : 0;
          return sortOrderPopulation === 'asc' ? popA - popB : popB - popA;
        });
      }

      return rows;
    }, [preparedRows]);

    return (
      <Table
        data={sortedRows}
        extraColumns={selectedColumns}
        onSort={handleSort}
        sortOrderCountry={sortOrderCountry}
        sortOrderPopulation={sortOrderPopulation}
      ></Table>
    );
  };

  return (
    <div className="main-page">
      <p className="text-xl">CO2 Emissions</p>
      <div className="flex items-center gap-3 mt-5">
        <div className="w-50 flex items-center gap-2 z-15">
          <label htmlFor="year">Select year:</label>
          <Select
            inputId="year"
            defaultValue={year}
            options={yearsOptions}
            onChange={handleSelectYear}
            theme={(theme) => ({
              ...theme,
              borderRadius: 0,
              colors: {
                ...theme.colors,
                primary25: '#575757ff',
                primary: '#919090ff',
                neutral0: '#353535ff',
                neutral80: '#f0f0f0ff',
              },
            })}
          />
        </div>
        <div className="flex items-center z-15">
          <label htmlFor="region"></label>
          <Select
            inputId="region"
            defaultValue={defaultRegion}
            options={regionOptions}
            onChange={handleSelectRegion}
            theme={(theme) => ({
              ...theme,
              borderRadius: 0,
              colors: {
                ...theme.colors,
                primary25: '#575757ff',
                primary: '#919090ff',
                neutral0: '#353535ff',
                neutral80: '#f0f0f0ff',
              },
            })}
          />
        </div>
        <button className="px-3 py-2 bg-gray-700 rounded" onClick={openModal}>
          Table options
        </button>
        <input
          type="text"
          placeholder="Search country..."
          className="input-country"
          onChange={handleSearchCountry}
        ></input>
      </div>
      {isModalOpen && (
        <Modal
          addColumns={setSelectedColumns}
          closeModal={setIsModalOpen}
          selectedColumns={selectedColumns}
        ></Modal>
      )}
      <ErrorBoundary fallback={<p>Failed to load data</p>}>
        <Suspense fallback={<Loader />}>
          <DataSection />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default MainPage;
