import type { CO2DataResponse } from '../types&interfaces/CO2Response';
import { createResource } from './createResource';

function fetchCO2Data(): Promise<CO2DataResponse> {
  return fetch('/co2-data.json').then((res) => res.json());
}

export const co2Resource = createResource(fetchCO2Data);
