import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

export function Viewbid() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    // Retrieve listings from local storage
    const storedListings = JSON.parse(localStorage.getItem('listingItems')) || [];
    setListings(storedListings);
  }, []);

  return (
    <>
      <h1 className="specific-page-title">Popular Bids</h1>

      <main>
        <div>
          {listings.length > 0 ? (
            listings.map((item, index) => (
              <div key={index} className="bid-item">
                <NavLink to="/item_info">
                  <img src={item.image || "/ShirtDemo.png"} width="200" alt={item.name} className="img-fluid" />
                  <p>${item.cost} | {item.bids} Bids</p>
                </NavLink>
              </div>
            ))
          ) : (
            <p>No listings available.</p>
          )}
        </div>
      </main>
    </>
  );
}