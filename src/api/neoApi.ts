import axios from 'axios'
import { getDateFormatted } from '../utils/dates'

export interface NeoData {
  loading: boolean,
  element_count?: number,
  links?: {
    next: string,
    prev: string,
    self: string,
  }
  near_earth_objects?: {
    [key: string]: NeoObjectData[],
  }
}

export interface NeoObjectData {
  id: string,
  name: string,
  nasa_jpl_url: string,
  is_potentially_hazardous_asteroid: boolean,
  estimated_diameter: {
    kilometers: {
      estimated_diameter_min: number,
      estimated_diameter_max: number,
    }
  }
  close_approach_data: [{
    close_approach_date_full: string,
    miss_distance: {
      kilometers: number,
    }
    relative_velocity: {
      kilometers_per_second: number,
    }
  }]
}

export const fetchNeoData = async (startDate: Date, endDate: Date = startDate): Promise<NeoData> => {
  const startDateFormatted: string = getDateFormatted('YYYY-MM-DD', startDate);
  const endDateFormatted: string = getDateFormatted('YYYY-MM-DD', endDate);

  const response = await axios.get<NeoData>(`${process.env.REACT_APP_NEO_API_URL}?start_date=${startDateFormatted}&end_date=${endDateFormatted}&api_key=${process.env.REACT_APP_NEO_API_KEY}`);

  return response.data;
}
