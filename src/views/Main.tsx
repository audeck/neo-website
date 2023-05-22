import React from 'react';
import { Hero } from '../components/Hero/Hero';
import { Content } from '../components/Content/Content';
import { NeoDataProvider } from '../components/NeoDataProvider';

const Main = () => {
  return (
    <div className='Main'>
      <NeoDataProvider>
        <Hero />
        <Content />
      </NeoDataProvider>
    </div>
  );
}

export default Main;
