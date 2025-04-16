import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export function Item_Info() {
  const [item, setItem] = useState(null);
  const [bids, setBids] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName');

  useEffect(() => {
    fetch(`/api/listings/${id}`)
      .then(res => res.json())
      .then(data => {
        setItem(data);
        setBids(data.bids);
        console.log("data", data)
      })
      .catch(err => console.error('Item not found:', err));
  }, [id]);

  const handleBid = async () => {
    if (!userName) {
      alert("You need to log in to place a bid.");
      navigate('/login');
      return;
    }

    if (!item) {
      alert("Item information not loaded yet.");
      return;
    }

    try {
      const res = await fetch(`/api/listings/${id}/bid`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userEmail: userName,
          amount: item.cost
        })
      });

      const data = await res.json();
      
      if (res.ok) {
        setBids(data.listing.bids);
        alert("Bid placed successfully!");
      } else {
        alert(data.msg || "Failed to place bid");
      }
    } catch (error) {
      console.error('Error placing bid:', error);
      alert("An error occurred while placing your bid");
    }
  };

  const handleRemove = async () => {
    if (!userName) {
      alert("You need to log in to remove an item.");
      navigate('/login');
      return;
    }

    if (!item) {
      alert("Item information not loaded yet.");
      return;
    }

    try {
      const res = await fetch(`/api/listings/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userEmail: userName })
      });

      if (res.ok) {
        alert("Item removed successfully.");
        navigate('/');
      } else {
        const error = await res.json();
        alert(error.msg || "Couldn't remove item");
      }
    } catch (error) {
      console.error('Error removing item:', error);
      alert("An error occurred while removing the item");
    }
  };

  if (!item) return <p>Loading...</p>;

  return (
    <main>
      <h1>Item Info</h1>
      <div className="bid-item">
        <img src={item.image || "https://files.catbox.moe/jgoh7b.png"} width="200" alt={item.name} />
        <p>{item.name} | ${item.cost} | {bids}/{item.bidsNeeded} Bids</p>
        <p>Seller: {item.seller}</p>
      </div>
      <p>{item.about}</p>

      <h3><button onClick={handleBid}>Bid</button></h3>

      {item.seller === userName && (
        <div>
          <button onClick={handleRemove}>Remove Item</button>
        </div>
      )}
    </main>
  );
}
