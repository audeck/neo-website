import React from 'react';
import './NearEarthObject.css';
import '../../global.css'

interface NearEarthObjectProps {
  dangerous: boolean,
  name: string,
  diameterMin: number,
  diameterMax: number,
  speed: number,
  missDateFull: string,
  missDistance: number,
  link: string,
}

const NearEarthObject = ({ dangerous, name, diameterMin, diameterMax, speed, missDateFull, missDistance, link }: NearEarthObjectProps ) => {
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
