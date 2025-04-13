import React, { useState, useEffect } from 'react';

export function Viewbid() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    fetch('/api/listings')
      .then(res => res.json())
      .then(data => setListings(data))
      .catch(err => console.error('Failed to fetch listings:', err));
  }, []);

  return (
    <>
      <h1 className="specific-page-title">Popular Bids</h1>
      <main>
        <div>
          {listings.length > 0 ? listings.map((item, index) => (
            <div key={index} className="bid-item">
              <img src={item.image || "/ShirtDemo.png"} width="200" alt={item.name} />
              <p>{item.name} | ${item.cost} | {item.bids}/{item.bidsNeeded} Bids</p>
            </div>
          )) : (
            <p>No listings available.</p>
          )}
        </div>
      </main>
    </>
  );
}