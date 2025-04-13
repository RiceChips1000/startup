import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

export function Cart() {
  const user = localStorage.getItem('userName'); // Still using this to ID the user
  const [cartItems, setCartItems] = useState([]);

  // Load cart from backend on mount
  useEffect(() => {
    fetch(`/api/cart/${user}`)
      .then(res => res.json())
      .then(data => setCartItems(data))
      .catch(err => console.error("Couldn't load cart", err));
  }, [user]);

  // Remove one item and update backend
  const handleRemove = async (itemName) => {
    const updatedCart = cartItems.filter(item => item.name !== itemName);
    setCartItems(updatedCart);

    await fetch(`/api/cart/${user}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedCart),
    });
  };

  // Clear cart on purchase
  const handleBuy = async () => {
    await fetch(`/api/cart/${user}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify([]),
    });
    setCartItems([]);
    alert("Thanks for buying! Your cart has been cleared.");
  };

  return (
    <>
      <h1 className="specific-page-title">Your Cart</h1>

      <main>
        {cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <div key={index}>
              <div className="bid-item">
                <NavLink to={`/item_info/${index}`} className="text-light text-decoration-none">
                  <img src={item.image || "/ShirtDemo.png"} width="200" alt={item.name} className="img-fluid" />
                  <p className="mt-2">{item.name} | ${item.cost} | {item.bids}/{item.bidsNeeded} Bids</p>
                </NavLink>
              </div>
              <p>
                <button onClick={() => handleRemove(item.name)}>Remove Bid</button>
              </p>
            </div>
          ))
        ) : (
          <p>No items in your cart.</p>
        )}

        {cartItems.length > 0 && (
          <div>
            <h1>Purchase</h1>
            <span>Credit Card:</span>
            <input type="text" placeholder="1234-5678-9012-3456" />
            <button onClick={handleBuy}>Buy</button>
          </div>
        )}
      </main>
    </>
  );
}