import axios from 'axios'
import { getDateFormatted } from '../utils/dates'
import { NeoData } from './neoApi.types';

export const fetchNeoData = async (startDate: Date, endDate: Date = startDate): Promise<NeoData> => {
  const startDateFormatted: string = getDateFormatted('YYYY-MM-DD', startDate);
  const endDateFormatted: string = getDateFormatted('YYYY-MM-DD', endDate);

  const response = await axios.get<NeoData>(
    `https://api.nasa.gov/neo/rest/v1/feed`
    + `?start_date=${startDateFormatted}`
    + `&end_date=${endDateFormatted}`
    + `&api_key=${process.env.REACT_APP_NEO_API_KEY}`);

  return response.data;
}
