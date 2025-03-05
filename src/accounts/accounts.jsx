import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Accounts() {
  return (
    <>
    <h1 className="specific-page-title">Accounts</h1>
    <main>
        <h1>Here at QuickBid you can either buy or list products</h1>
        <form method="get">
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

        <form method="get" NavLink to="/sell_items">
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
      </>
  );
}