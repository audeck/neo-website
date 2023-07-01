import React, { useEffect, useState } from 'react'
import { getDateFormatted } from '../../utils/dates';
import NearEarthObject from '../NearEarthObject/NearEarthObject';
import { NeoData } from '../../api/neoApi.types';
import { fetchNeoData } from '../../api/neoApi';
import './NearEarthObjectList.css'

interface NearEarthObjectListProps {
  date: Date;
}

export const NearEarthObjectList = ({ date }: NearEarthObjectListProps) => {
  const [neoData, setNeoData] = useState<NeoData>({} as NeoData);

  const dateFormatted = getDateFormatted('YYYY-MM-DD', date);
  const neoObjectsList = neoData.near_earth_objects;
  const neoObjects = neoObjectsList ? neoObjectsList[dateFormatted] : [];

  useEffect(() => {
    fetchNeoData(date)
      .then(data => setNeoData(data));
  }, [date]);

  if (!neoObjectsList || !(dateFormatted in neoObjectsList)) {
    // TODO: Loading UI
    console.log("Loading!");
    return <div>Loading!</div>
  }

  return (
    <ul className='NearEarthObjectList'>
      {neoObjects.map(object => (
        <NearEarthObject key={object.id} object={object} />
      ))}
      {process.env.NODE_ENV === 'development' && <NearEarthObject key={1}
        object={{
          id: '1',
          name: 'Dangerous one!',
          nasa_jpl_url: 'https://google.com',
          is_potentially_hazardous_asteroid: true,
          estimated_diameter: {
            kilometers: {
              estimated_diameter_min: 1,
              estimated_diameter_max: 2,
            }
          },
          close_approach_data: [{
            close_approach_date_full: '22:22',
            miss_distance: {
              kilometers: 0,
            },
            relative_velocity: {
              kilometers_per_second: 9001,
            }
          }]
        }}
      />}
    </ul>
  )
}
