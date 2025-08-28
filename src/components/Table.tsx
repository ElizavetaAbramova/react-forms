import '../styles/table.css';
import type { ExtraData, SortedData } from '../types&interfaces/CO2Response';
import type { SortTarget } from '../pages/MainPage';
import { memo } from 'react';

interface Props {
  year?: number;
  data: SortedData[];
  extraColumns: ExtraData[];
  onSort: (target: SortTarget) => void;
  sortOrderCountry: 'asc' | 'desc';
  sortOrderPopulation: 'asc' | 'desc';
}

function Table({
  data,
  extraColumns,
  onSort,
  sortOrderCountry,
  sortOrderPopulation,
}: Props) {
  return (
    <div className="overflow-x-auto overflow-y-auto w-full max-h-[600px] mt-10">
      <table className="min-w-full border border-gray-300 text-sm">
        <thead className="sticky top-0 z-2">
          <tr className="bg-gray-700">
            <th
              className="border px-4 py-2 text-right w-50"
              onClick={() => onSort('country')}
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
              onClick={() => onSort('population')}
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
          {data.map((countryObj) => {
            return (
              <tr
                key={countryObj.country}
                className="hover:bg-gray-800 text-right"
              >
                <td className="border px-4 py-2 text-center">
                  {countryObj.country}
                </td>
                <td className="border px-4 py-2">{countryObj.iso_code}</td>
                <td className="border px-4 py-2">{countryObj.population}</td>
                <td className="border px-4 py-2">{countryObj.year}</td>
                <td className="border px-4 py-2">{countryObj.co2}</td>
                <td className="border px-4 py-2">
                  {countryObj.co2_per_capita}
                </td>
                {extraColumns.map((col) => (
                  <td key={col} className="border px-4 py-2 ">
                    {countryObj[col] ?? 'N/A'}
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

export default memo(Table);
