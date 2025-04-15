import React, { useEffect, useState } from 'react';

export function Viewbid() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    // Fetch listings from the backend API
    fetch('/api/listings')
      .then(async res => {
        const text = await res.text();
        console.log('Raw response:', text);  // Log raw response
        return JSON.parse(text); // Try parsing manually in case of HTML or other issues
      })
      .then(data => {
        console.log('Listings loaded:', data);  // Log parsed data
        setListings(data);  // Set the state with the listings data
      })
      .catch(err => console.error('Error loading listings:', err));  // Log any errors
  }, []); // Empty dependency array means this runs once when the component mounts

  return (
    <div>
      <h1>All Listings</h1>
      {listings.length === 0 && <p>No listings available.</p>}
      <ul>
        {listings.map((item, idx) => (
          <li key={idx}>
            <strong>{item.name}</strong> - ${item.cost} ({item.bids} bids)
          </li>
        ))}
      </ul>
    </div>
  );
}
