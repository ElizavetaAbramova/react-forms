import { useEffect } from 'react';
import '../styles/table.css';
import { co2Resource } from '../utils/co2resource';

interface Props {
  year: number;
}

function Table({ year }: Props) {
  const data = co2Resource.read();

  useEffect(() => {
    console.log('render');
  }, [year]);

  return (
    <div className="table">
      <table className="min-w-full border border-gray-300 text-sm">
        <thead>
          <tr className="bg-gray-700">
            <th className="border px-4 py-2 text-left">Country</th>
            <th className="border px-4 py-2 text-right">ISO</th>
            <th className="border px-4 py-2 text-right">Population</th>
            <th className="border px-4 py-2 text-right">Year</th>
            <th className="border px-4 py-2 text-right">CO2</th>
            <th className="border px-4 py-2 text-right">CO2_per_capita</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(data).map(([country, countryData]) => {
            return (
              <tr key={country} className="hover:bg-gray-800">
                <td className="border px-4 py-2">{country}</td>
                <td className="border px-4 py-2 text-right">
                  {countryData.iso_code ?? 'N/A'}
                </td>
                <td className="border px-4 py-2 text-right">
                  {countryData.data.find((d) => d.year === year)?.population ??
                    'N/A'}
                </td>
                <td className="border px-4 py-2 text-right">{year}</td>
                <td className="border px-4 py-2 text-right">
                  {countryData.data.find((d) => d.year === year)?.co2 ?? 'N/A'}
                </td>
                <td className="border px-4 py-2 text-right">
                  {countryData.data.find((d) => d.year === year)
                    ?.co2_per_capita ?? 'N/A'}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
