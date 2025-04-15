import React, { useEffect, useState } from 'react';

export function Cart() {
  const [cartItems, setCartItems] = useState([]);

  // Function to generate random bear image URL
  const getRandomBearImage = () => {
    const width = Math.floor(Math.random() * (400 - 200) + 200); // Random width between 200-400
    const height = Math.floor(Math.random() * (400 - 200) + 200); // Random height between 200-400
    return `https://placebear.com/${width}/${height}`;
  };

  useEffect(() => {
    fetch('/api/cart')
      .then(res => {
        if (res.status === 401) throw new Error('Not logged in');
        return res.json();
      })
      .then(data => {
        // Add random bear image to each cart item
        const itemsWithBears = data.map(item => ({
          ...item,
          image: getRandomBearImage()
        }));
        setCartItems(itemsWithBears);
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
    <main>
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty or you're not logged in.</p>
      ) : (
        <>
          {cartItems.map((item, index) => (
            <div key={index} className="cart-item">
              <img 
                src={item.image} 
                alt={`Bear for ${item.name}`}
                style={{ 
                  maxWidth: '300px',
                  height: 'auto',
                  borderRadius: '8px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              />
              <p>{item.name} - ${item.cost}</p>
              <button onClick={() => removeFromCart(item.name)}>Remove</button>
            </div>
          ))}
          <button onClick={purchaseCart} style={{ marginTop: '20px' }}>Purchase All</button>
        </>
      )}
    </main>
  );
}
