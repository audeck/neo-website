import React, { useContext, useEffect, useRef, useState } from 'react'
import { getDateFormatted, getDayOrdinal } from '../../utils/dates';
import './Hero.css'
import '../../global.css'
import { NeoDataContext } from '../NeoDataProvider';

export const Hero = () => {
  const currentDate: Date = new Date();
  const [neoData] = useContext(NeoDataContext);

  // Today's NEO count, 'dangerousness' and isFirstFetch to update only once
  const [neoCount, setNeoCount] = useState<number>();
  const [isFirstFetch, setIsFirstFetch] = useState<boolean>(false);
  const [isDangerousDay, setIsDangerousDay] = useState<boolean>(false);

  useEffect(() => {
    // Update hero NEO count only once after initial load
    if (!neoData.loading && !isFirstFetch) {
      setNeoCount(neoData.element_count);

      const dateFormatted = getDateFormatted('YYYY-MM-DD', currentDate);
      setIsDangerousDay(neoData.near_earth_objects![dateFormatted]
        .reduce(
          (isDangerous: boolean, object) => (
            isDangerous || object.is_potentially_hazardous_asteroid
          ),
          false
        )
      )

      setIsFirstFetch(true);
    }
  }, [neoData]);

  return (
    <div className='Hero'>
      <div className='Hero-text'>
        <h1>
          Today is the <span className='accented'>{getDayOrdinal(currentDate.getDate())} of {currentDate.toLocaleString('default', { month: 'long' })}, {currentDate.getFullYear()}</span>.
        </h1>
        <h2>
          There are <span className='accented'>{neoCount}</span> near-Earth objects passing by today. {isDangerousDay ? 'Scary!' : 'Safe!'}
        </h2>
      </div>
    </div>
  );
}
