import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './viewbid.css';

export function Viewbid() {
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch listings from the backend API WORKS RAAAHH
    fetch('/api/listings')
      .then(async res => {
        const text = await res.text();
        console.log('Raw response:', text);  // Log raw response
        return JSON.parse(text); 
      })
      .then(data => {
        console.log('Listings loaded:', data);  // Log parsed data
        setListings(data);  // Set state with listing data
      })
      .catch(err => console.error('Error loading listings:', err));  // Log any errors
  }, []); 

  const handleListingClick = (id) => {
    navigate(`/item_info/${id}`);
  };

  return (
    <div className="listings-container">
      <h1>All Listings</h1>
      {listings.length === 0 ? (
        <p>No listings available.</p>
      ) : (
        <div className="listings-grid">
          {listings.map((item, idx) => (
            <div 
              key={idx} 
              className="listing-card"
              onClick={() => handleListingClick(idx)}
            >
              <img 
                src={item.image || "https://files.catbox.moe/jgoh7b.png"} 
                alt={item.name}
                className="listing-image"
              />
              <div className="listing-info">
                <h3>{item.name}</h3>
                <p className="price">${item.cost}</p>
                <p className="bids">{item.bids} bids</p>
                <p className="seller">Seller: {item.seller}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
