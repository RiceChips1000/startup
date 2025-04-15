import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export function Item_Info() {
  const [item, setItem] = useState(null);
  const [bids, setBids] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/listings/${id}`)
      .then(res => res.json())
      .then(data => {
        setItem(data);
        setBids(data.bids);
      })
      .catch(err => console.error('Item not found:', err));
  }, [id]);

  const handleBid = async () => {
    const res = await fetch(`/api/listings/${id}/bid`, { method: 'POST' });
    if (res.ok) {
      const data = await res.json();
      setBids(data.updatedListing.bids);
    } else if (res.status === 401) {
      alert("You need to log in to place a bid.");
      navigate('/login');
    } else {
      const error = await res.json();
      alert(error.msg || "Something went wrong");
    }
  };

  const handleRemove = async () => {
    const res = await fetch(`/api/listings/${id}`, { method: 'DELETE' });
    if (res.ok) {
      alert("Item removed.");
      navigate('/');
    } else {
      const err = await res.json();
      alert(err.msg || "Couldn't remove item");
    }
  };

  if (!item) return <p>Loading...</p>;

  return (
    <main>
      <h1>Item Info</h1>
      <div className="bid-item">
        <img src={item.image || "/ShirtDemo.png"} width="200" alt={item.name} />
        <p>{item.name} | ${item.cost} | {bids}/{item.bidsNeeded} Bids</p>
        <p>Seller: {item.seller}</p>
      </div>
      <p>{item.about}</p>

      <h3><button onClick={handleBid}>Bid</button></h3>

      {item.seller && (
        <div>
          <button onClick={handleRemove}>Remove Item</button>
        </div>
      )}
    </main>
  );
}
