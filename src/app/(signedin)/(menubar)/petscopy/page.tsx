'use client';
import ImageCalender from '@/components/ImageCalender';
import React from 'react';
import RootLayout from '../layout';
import Calentercomponents from '@/components/Calentercomponents';


const Pets = () => {
 
  return (
    <RootLayout pageName="Pets">
      <div className="grid  grid-cols-1 lg:grid-cols-3 h-full bg-gray-50 pb-10 ">
   <Calentercomponents handleDateChange={function (value: string): void {
          throw new Error('Function not implemented.');
        } } />
       </div>
    </RootLayout>
  );
};

export default Pets;
