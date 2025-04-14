  import React, { useEffect, useState } from 'react';
  import { NavLink } from 'react-router-dom';

  export function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [lastInteraction, setLastInteraction] = useState(Date.now()); // Track last interaction time

    // Function to update the last interaction time
    const updateLastInteraction = () => {
      setLastInteraction(Date.now());
    };

    useEffect(() => {
      // Get cart items from localStorage
      const userCart = JSON.parse(localStorage.getItem('userCart')) || [];
      setCartItems(userCart);

      // Auto-clear the cart after 30 minutes of inactivity
      const interval = setInterval(() => {
        const currentTime = Date.now();
        const timeElapsed = currentTime - lastInteraction;

        // If 30 minutes have passed (1800000 milliseconds) because 30*60*1000
        if (timeElapsed >= 1800000) {
          localStorage.removeItem('userCart'); // Clear cart in localStorage
          setCartItems([]); // Clear UI cart
          alert("Your cart has been cleared due to inactivity.");
        }
      }, 10000); // Check every 10 seconds

      // Event listeners to update last interaction time on user activity
      window.addEventListener('click', updateLastInteraction);
      window.addEventListener('scroll', updateLastInteraction);
      window.addEventListener('keydown', updateLastInteraction); // Track keyboard activity as well

      // Cleanup event listeners and interval on component unmount
      return () => {
        clearInterval(interval);
        window.removeEventListener('click', updateLastInteraction);
        window.removeEventListener('scroll', updateLastInteraction);
        window.removeEventListener('keydown', updateLastInteraction);
      };
    }, [lastInteraction]);

    const handleRemove = (nameToRemove) => {
      const updatedCart = cartItems.filter(item => item.name !== nameToRemove);
      setCartItems(updatedCart);
      localStorage.setItem('userCart', JSON.stringify(updatedCart));
    };

    /*This code will work once I get the data base set up correctly cause the item info I made based off the url and this would be too silly so yeah*/
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
                  <button onClick={() => handleRemove(item.name)}>
                    Remove Bid
                  </button>
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
              <button onClick={() => {
                localStorage.removeItem('userCart');
                setCartItems([]); // clear UI
                alert("Thanks for buying this stuff yo! Your cart has been cleared.");
              }}>
                Buy
              </button>
            </div>
          )}
        </main>
      </>
    );
  }