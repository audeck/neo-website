import React from 'react';
import { Hero } from '../components/Hero/Hero';
import { Content } from '../components/Content/Content';
import { CanvasBackground } from '../components/CanvasBackground';

const Main = () => {
  return (
    <div className='Main'>
      <CanvasBackground />
      <Hero />
      <Content />
    </div>
  );
}

export default Main;
