import React, { useEffect, useState } from 'react';

export function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetch('/api/cart')
      .then(res => {
        if (res.status === 401) throw new Error('Not logged in');
        return res.json();
      })
      .then(data => setCartItems(data))
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
              <img src={item.image || "/ShirtDemo.png"} width="150" alt={item.name} />
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
