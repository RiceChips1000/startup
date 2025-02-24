import React from 'react';

export function Accounts() {
  return (

    <main>

        <h1 class="specific-page-title">Your Bids</h1>
  
        <h1>Here at Quick Bid You Can Either List or Buy Products</h1>
        <form method="get" action="viewbid.html">
          <div>
            <h1>Buyer</h1>
            <span>E-Mail:</span>
            <input type="text" placeholder="your@email.com" />
          </div>
          <div>
            <span>Password:</span>
            <input type="password" placeholder="password" />
          </div>
          <button type="submit">Login</button>
          <button type="submit">Create</button>
        </form>

        <form method="get" action="sell_items.html">
            <h1>Seller</h1>
            <div>
              <span>E-Mail:</span>
              <input type="text" placeholder="your@email.com" />
            </div>
            <div>
              <span>Password:</span>
              <input type="password" placeholder="password" />
            </div>
            <button type="submit">Login</button>
            <button type="submit">Create</button>
          </form>
      </main>
  );
}