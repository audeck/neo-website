import React, { useContext, useEffect, useState } from 'react'
import { getDateFormatted } from '../../utils/dates';
import NearEarthObject from '../NearEarthObject/NearEarthObject';
import './NearEarthObjectList.css'
import { NeoData } from '../../api/neoApi.types';
import { fetchNeoData } from '../../api/neoApi';

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
        <NearEarthObject
          key={object.id}
          dangerous={object.is_potentially_hazardous_asteroid}
          name={object.name}
          diameterMin={
            object.estimated_diameter.kilometers.estimated_diameter_min
          }
          diameterMax={
            object.estimated_diameter.kilometers.estimated_diameter_max
          }
          speed={
            object.close_approach_data[0].relative_velocity.kilometers_per_second
          }
          missDateFull={
            object.close_approach_data[0].close_approach_date_full
          }
          missDistance={
            object.close_approach_data[0].miss_distance.kilometers
          }
          link={object.nasa_jpl_url}
        />
      ))}
      {process.env.NODE_ENV === 'development' && <NearEarthObject
        key={1}
        dangerous={true}
        name={'Dangerous one!'}
        diameterMin={1}
        diameterMax={2}
        speed={9001}
        missDateFull={'22:22'}
        missDistance={0}
        link={'https://google.com'}
      />}
    </ul>
  )
}
