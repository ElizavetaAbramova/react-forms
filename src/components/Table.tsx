import { useEffect, useState } from 'react';
import '../styles/table.css';
import { co2Resource } from '../utils/co2resource';
import type { ExtraData } from '../types&interfaces/CO2Response';

interface Props {
  year: number;
  extraColumns: ExtraData[];
}

function Table({ year, extraColumns }: Props) {
  const data = co2Resource.read();
  const [sortOrderCountry, setSortOrderCountry] = useState<'asc' | 'desc'>(
    'asc'
  );
  const [sortOrderPopulation, setSortOrderPopulation] = useState<
    'asc' | 'desc'
  >('asc');

  useEffect(() => {
    console.log('render');
  }, [year]);

  const handleSort = (sortTarget: string) => {
    if (sortTarget === 'country') {
      setSortOrderCountry(sortOrderCountry === 'asc' ? 'desc' : 'asc');
      console.log('country sort');
    }
    if (sortTarget === 'population') {
      setSortOrderPopulation(sortOrderPopulation === 'asc' ? 'desc' : 'asc');
      console.log('population sort');
    }
  };

  return (
    <div className="overflow-x-auto overflow-y-auto w-full max-h-[600px] mt-10">
      <table className="min-w-full border border-gray-300 text-sm">
        <thead className="sticky top-0 z-10">
          <tr className="bg-gray-700">
            <th
              className="border px-4 py-2 text-right w-50"
              onClick={() => handleSort('country')}
            >
              <div className="flex">
                <div className="w-1/2">Country</div>
                <div className="w-1/2 ">
                  {sortOrderCountry === 'asc' ? ' ▲' : ' ▼'}
                </div>
              </div>
            </th>
            <th className="border px-4 py-2 text-right">ISO</th>
            <th
              className="border px-4 py-2 text-right"
              onClick={() => handleSort('population')}
            >
              <div className="flex">
                <div className="w-1/2">Population</div>
                <div className="w-1/2 ">
                  {sortOrderPopulation === 'asc' ? ' ▲' : ' ▼'}
                </div>
              </div>
            </th>
            <th className="border px-4 py-2 text-right">Year</th>
            <th className="border px-4 py-2 text-right">CO2</th>
            <th className="border px-4 py-2 text-right">CO2_per_capita</th>
            {extraColumns.map((col) => (
              <th key={col} className="border px-4 py-2 text-right">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.entries(data).map(([country, countryData]) => {
            const filteredByYear = countryData.data.find(
              (d) => d.year === year
            );
            return (
              <tr key={country} className="hover:bg-gray-800">
                <td className="border px-4 py-2">{country}</td>
                <td className="border px-4 py-2 text-right">
                  {countryData.iso_code ?? 'N/A'}
                </td>
                <td className="border px-4 py-2 text-right">
                  {filteredByYear?.population ?? 'N/A'}
                </td>
                <td className="border px-4 py-2 text-right">{year}</td>
                <td className="border px-4 py-2 text-right">
                  {filteredByYear?.co2 ?? 'N/A'}
                </td>
                <td className="border px-4 py-2 text-right">
                  {filteredByYear?.co2_per_capita ?? 'N/A'}
                </td>
                {extraColumns.map((col) => (
                  <td key={col} className="border px-4 py-2 text-right">
                    {filteredByYear?.[col] ?? 'N/A'}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
