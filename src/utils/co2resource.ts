import type { CO2DataResponse } from '../types&interfaces/CO2Response';
import { createResource } from './createResource';

function fetchCO2Data(): Promise<CO2DataResponse> {
  const url = import.meta.env.VITE_CO2_URL;
  return fetch(url).then((res) => res.json());
}

export const co2Resource = createResource(fetchCO2Data);
