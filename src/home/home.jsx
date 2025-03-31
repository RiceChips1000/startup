import React from 'react';
import { NavLink } from 'react-router-dom';
import { Viewbid } from '../viewbid/viewbid';

export function Home() {
  return (
    <>

    <h1 className="specific-page-title">Top Bids</h1>
    
    
        <Viewbid/>
      

      </>
  );
}