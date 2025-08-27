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
