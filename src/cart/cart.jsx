import React, { useEffect, useState } from 'react';
import './cart.css';

export function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [bearImage, setBearImage] = useState('');

  // Function to fetch random bear image
  const fetchBearImage = async () => {
    try {
      const width = Math.floor(Math.random() * (400 - 200) + 200);
      const height = Math.floor(Math.random() * (400 - 200) + 200);
      const response = await fetch(`https://placebear.com/${width}/${height}`, {
        mode: 'no-cors',
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      });
      if (response.ok || response.type === 'opaque') {
        setBearImage(`https://placebear.com/${width}/${height}`);
      }
    } catch (error) {
      console.error('Error fetching bear image:', error);
      // Set a default bear image URL if the fetch fails
      setBearImage('https://placebear.com/200/200');
    }
  };

  useEffect(() => {
    fetchBearImage();
    fetch('/api/cart')
      .then(res => {
        if (res.status === 401) throw new Error('Not logged in');
        return res.json();
      })
      .then(data => {
        // Set default image for items without an image
        const itemsWithDefaultImages = data.map(item => ({
          ...item,
          image: item.image || '/ShirtDemo.png'
        }));
        setCartItems(itemsWithDefaultImages);
        console.log("cart items", itemsWithDefaultImages)
      })
      .catch(err => {
        console.error(err.message);
        setCartItems([]);
      });
  }, []);

  const removeFromCart = async (name) => {
    const res = await fetch('/api/cart/remove', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });

    if (res.ok) {
      setCartItems((prev) => prev.filter(item => item.name !== name));
    } else {
      const error = await res.json();
      alert(error.msg || "Couldn't remove item.");
    }
  };

  const purchaseCart = async () => {
    const res = await fetch('/api/cart/purchase', { method: 'POST' });
    if (res.ok) {
      alert('Purchase successful!');
      setCartItems([]);
    } else {
      const error = await res.json();
      alert(error.msg || 'Purchase failed');
    }
  };

  return (
    <main className="cart-container">
      <div className="fun-bear-container">
        <img 
          src={bearImage} 
          alt="A friendly bear" 
          className="fun-bear-image"
        />
      </div>
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item, index) => (
            <div key={index} className="cart-item">
              <img 
                src={item.image} 
                alt={item.name}
                className="cart-item-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/ShirtDemo.png';
                }}
              />
              <div className="cart-item-info">
                <h3>{item.name}</h3>
                <p className="price">${item.cost}</p>
                <button 
                  onClick={() => removeFromCart(item.name)}
                  className="remove-button"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <button 
            onClick={purchaseCart} 
            className="purchase-button"
          >
            Purchase All
          </button>
        </div>
      )}
    </main>
  );
}
