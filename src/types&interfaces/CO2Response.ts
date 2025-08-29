export interface YearlyData {
  year: number;
  population?: number;
  co2?: number;
  co2_per_capita?: number;
  methane?: number;
  oil_co2?: number;
  temperature_change_from_co2?: number;
  cement_co2?: number;
  cement_co2_per_capita?: number;
}

export interface CountryData {
  iso_code?: string;
  data: YearlyData[];
}

export type CO2DataResponse = Record<string, CountryData>;

export type ExtraData = Exclude<
  keyof YearlyData,
  'year' | 'population' | 'co2' | 'co2_per_capita'
>;

export type SortedData = {
  iso_code: string;
  country: string;
  year: number;
  population: number | 'N/A';
  co2: number | 'N/A';
  co2_per_capita: number | 'N/A';
  methane?: number | 'N/A';
  oil_co2?: number | 'N/A';
  temperature_change_from_co2?: number | 'N/A';
  cement_co2?: number | 'N/A';
  cement_co2_per_capita?: number | 'N/A';
};
