import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export function Item_Info() {
  const [item, setItem] = useState(null);
  const { id } = useParams();
  const [bids, setBids] = useState(0);
  const userName = localStorage.getItem('userName'); // Get logged-in user's name

  const handleBid = () => {
    const updatedBids = bids + 1;
    setBids(updatedBids);

    const storedListings = JSON.parse(localStorage.getItem('listingItems')) || [];
    storedListings[parseInt(id)].bids = updatedBids;
    localStorage.setItem('listingItems', JSON.stringify(storedListings));

    // Add to user cart if not already there
    let userCart = JSON.parse(localStorage.getItem('userCart')) || [];
    const alreadyBid = userCart.some(item => item.name === storedListings[parseInt(id)].name);
    if (!alreadyBid) {
      userCart.push(storedListings[parseInt(id)]);
      localStorage.setItem('userCart', JSON.stringify(userCart));
    }
  };

  const handleRemoveItem = () => {
    const storedListings = JSON.parse(localStorage.getItem('listingItems')) || [];
    // remove the item from the listing
    const updatedListings = storedListings.filter((listing, index) => index !== parseInt(id));
    localStorage.setItem('listingItems', JSON.stringify(updatedListings));

    // removes from cart if it is there.
    let userCart = JSON.parse(localStorage.getItem('userCart')) || [];
    userCart = userCart.filter(item => item.name !== item.name);
    localStorage.setItem('userCart', JSON.stringify(userCart));

  
    alert("Item removed successfully.");
    window.location.href = '/'; // redirests to home page pretty sick 
  };

  useEffect(() => {
    const storedListings = JSON.parse(localStorage.getItem('listingItems')) || [];
    const foundItem = storedListings[parseInt(id)];

    if (foundItem) {
      setItem(foundItem);
      setBids(foundItem.bids);
    } else {
      console.error("Item not found!");
    }
  }, [id]);

  if (!item) return <p>Loading item...</p>;

  return (
    <main>
      <h1>Item Info</h1>
      <div className="bid-item">
        <img src={item.image || "/ShirtDemo.png"} width="200" alt={item.name} className="img-fluid" />
        <p>{item.name} | ${item.cost} | {item.bids}/{item.bidsNeeded} Bids</p>
        <p>Seller: {item.seller}</p>
      </div>
      <p>{item.about}</p>

      {/* Bid button */}
      <h3><button onClick={handleBid}>Bid</button></h3>

      {/* This only lets the seller of the item see da remove button yaya */}
      {item.seller === userName && (
        <div>
          <button onClick={handleRemoveItem}>Remove Item</button>
        </div>
      )}
    </main>
  );
}