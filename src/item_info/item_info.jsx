import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export function Item_Info() {

  const [listings, setListings] = useState([]);
  const [item, setItem] = useState(null);
  const {id} = useParams();
  console.log(id)
  useEffect(() => {
    // Retrieve listings from local storage
    const storedListings = JSON.parse(localStorage.getItem('listingItems')) || [];
    const foundItem = storedListings[parseInt(id)];

    if(foundItem) {
      setItem(foundItem);
    }
    else {
      console.error("Item not Found!")
    }
  }, [id]);

  if (!item) return <p>Loading item...</p>;

  
  return (
    <main>
      
        <h1>Item Info</h1>
        <div className="bid-item">
        <img src={item.image || "/ShirtDemo.png"} width="200" alt="Shirt" classNameName="img-fluid" />
        <p>{item.name} | ${item.cost} | {item.bids}/{item.bidsNeeded} Bids</p>
        <p>Seller: {item.seller}</p>
        </div>
        <p>{item.about}</p>
        <h3><button onClick={() => alert("Will be implemented when storage is made(will put it inside the users cart")}>Bid</button></h3>
    </main>
  );
}