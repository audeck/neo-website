import React, { useEffect, useState } from 'react'
import { getDateFormatted, getDayOrdinal } from '../../utils/dates';
import { fetchNeoData } from '../../api/neoApi';
import { NeoObjectData } from '../../api/neoApi.types';
import { CanvasEarth } from '../CanvasEarth';
import { Header } from '../Header';
import '../../global.css';
import './Hero.css';

export const Hero = () => {
  const [neoCount, setNeoCount] = useState<number>();
  const [isDangerousDay, setIsDangerousDay] = useState<boolean>(false);
  
  const currentDate: Date = new Date();
  const day: string = getDayOrdinal(currentDate.getDate());
  const month: string = currentDate.toLocaleString('default', { month: 'long' });
  const year: number = currentDate.getFullYear();

  useEffect(() => {
    const dateFormatted = getDateFormatted('YYYY-MM-DD', currentDate);
    fetchNeoData(currentDate)
      .then(data => {
        setNeoCount(data.element_count);
        setIsDangerousDay(data.near_earth_objects![dateFormatted].reduce(
          (isDangerous: boolean, object: NeoObjectData) => (
            isDangerous || object.is_potentially_hazardous_asteroid
          ),
          false
        ))

      });
  }, []);

  return <>
    <Header />
    <div className='Hero'>
      <div className='Hero-text'>
        <h1>
          Today is the <span className='accented'>{day} of {month}, {year}</span>.
        </h1>
        <h2>
          There are <span className='accented'>{neoCount}</span> near-Earth objects passing by today. {isDangerousDay ? 'Scary!' : 'Safe!'}
        </h2>
      </div>
      <CanvasEarth />
    </div>
  </>;
}
