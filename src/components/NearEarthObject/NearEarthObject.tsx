import React from 'react';
import './NearEarthObject.css';
import '../../global.css'
import { NeoObjectData } from '../../api/neoApi.types';

interface NearEarthObjectProps {
  object: NeoObjectData,
}

const NearEarthObject = ({ object }: NearEarthObjectProps) => {
  const {
    name,
    is_potentially_hazardous_asteroid: dangerous,
    nasa_jpl_url: link,
    estimated_diameter: {
      kilometers: {
        estimated_diameter_min: diameterMin,
        estimated_diameter_max: diameterMax,
      }
    },
    close_approach_data: [{
      close_approach_date_full: missDateFull,
      miss_distance: {
        kilometers: missDistance
      },
      relative_velocity: {
        kilometers_per_second: speed,
      }
    }]
  } = object;

  return (
    <a 
    href={link} 
    className={`NearEarthObject ${dangerous ? 'dangerous' : 'safe'}`}
    target='_blank'
    rel='noreferrer'>
      <h1>
        <span className='accented'>
          {name}
        </span>
      </h1>
      <p>
        DIAMETER:&nbsp;
        <span className='accented'>
          {`${Number(diameterMin).toFixed(2)} - ${Number(diameterMax).toFixed(2)} km`}
        </span>
      </p>
      <p>
        CURRENT SPEED:&nbsp;
        <span className='accented'>
          {`${Number(speed).toFixed(2)} km/s`}
        </span>
      </p>
      <p>
        PASSING AT:&nbsp;
        <span className='accented'>
          {missDateFull.slice(-5)}
        </span>
      </p>
      <p>
        MINIMUM DISTANCE:&nbsp;
        <span className='accented'>
          {`${Number(missDistance).toFixed(0)} km`}
        </span>
      </p>
    </a>
  )
}

export default NearEarthObject;
