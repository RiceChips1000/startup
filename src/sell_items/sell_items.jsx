import React from 'react';
import { NavLink } from 'react-router-dom';
import {ListingItemInfo} from './item_object'
import 'bootstrap/dist/css/bootstrap.min.css';


// <div className="bid-item"><NavLink to="/item_info"><img src={"/ShirtDemo.png"} width="200" alt="Shirt" classNameName="img-fluid" /><p>$35 | 34/100 Bids</p></NavLink></div>
//<img src={"/ShirtDemo.png"} width="200" alt="Shirt" classNameName="img-fluid" />
export function Sell_Items() {
  return (
    <>

    <h1 className="specific-page-title">Your Listings</h1>

    <main>
      
      

      <ListingItemInfo />

    </main>
    </>
  );
}