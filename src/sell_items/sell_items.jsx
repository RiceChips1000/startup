import React from 'react';
import { NavLink } from 'react-router-dom';

export function Sell_Items() {
  return (
    <>

    <h1 class="specific-page-title">Your Listings</h1>

    <main>
      <img src={"/ShirtDemo.png"} width="200" alt="Shirt" className="img-fluid" />
      <p>Price:<input type="text" placeholder="XX$" /></p>
      <p>Bids Needed:<input type="text" placeholder="XX"/></p>
      <p>Product Information:<input type="text" placeholder="..."/></p>
      <button type="submit">Create Listing</button>
    </main>
    </>
  );
}