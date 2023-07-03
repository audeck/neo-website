import React, { useState } from 'react';
import { NearEarthObjectList } from '../NearEarthObjectList/NearEarthObjectList';
import arrow from '../../assets/nav-arrow.svg';
import './Content.css';



export const Content = () => {
  const [date, setDate] = useState(new Date());

  const incrementDate = (): void => {
    changeDate(1);
  }

  const decrementDate = (): void => {
    changeDate(-1);
  }

  const changeDate = (change: number): void => {
    const newDate: Date = new Date();
    newDate.setDate(date.getDate() + change);
    setDate(newDate);
  }

  return (
    <section className='Content'>
      <div className='Content-wrapper'>
        <header className='Content-header'>
          <button onClick={decrementDate}>
            <img 
              className='arrow-back'
              src={arrow}
              alt='Arrow back' />
          </button>
          <h1>Here are our visitors for {`${date.toLocaleDateString()}`}!</h1>
          <button onClick={incrementDate}>
            <img 
              className='arrow-forward' 
              src={arrow}
              alt='Arrow forward' />
          </button>
        </header>
        <NearEarthObjectList date={date} />
      </div>
    </section>
  )
}
