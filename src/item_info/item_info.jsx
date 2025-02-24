import React from 'react';
import { NavLink } from 'react-router-dom';

export function Item_Info() {
  return (
    <main>
        <h1>Item Info</h1>
        <span><img src={"/ShirtDemo.png"} width="200" alt="Shirt" classNameName="img-fluid" /><p>$45 | 5/100 Bids</p></span>
        <p>This item is made of ------</p>
        <p>It was made in america</p>
        <p>Very Cheap no cost</p>
        <h3><button>Bid</button></h3>
    </main>
  );
}