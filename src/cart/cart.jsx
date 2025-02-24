import React from 'react';
import { NavLink } from 'react-router-dom';

export function Cart() {
  return (
    <>

    <h1 className="specific-page-title">Your Cart</h1>
    
    <main>
      <div>
      <div className="bid-item">
        <NavLink to="/item_info" className="text-light text-decoration-none">
        <img src={"/ShirtDemo.png"} width="200" alt="Shirt" className="img-fluid" />
        <p className="mt-2">$45 | 5/100 Bids</p>
        </NavLink></div>
        <p><button>Remove Bid</button></p>
      </div>
      <div>
        <div className="bid-item">        
        <NavLink to="/item_info" className="text-light text-decoration-none">
        <img src={"/ShirtDemo.png"} width="200" alt="Shirt" className="img-fluid" />
        <p className="mt-2">$45 | 5/100 Bids</p>
        </NavLink>
        </div>
        <p><button>Remove Bid</button></p>
      </div>
            <div>
              <h1>Purchase</h1>
              <span>Credit-Card:</span>
              <input type="text" placeholder="123-456-7890"/>
              <button>Buy</button>
            </div>
    </main>
    </>
  );
}
