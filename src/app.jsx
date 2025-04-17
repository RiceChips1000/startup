import React, { useState, useEffect } from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Home } from './home/home';
import { Login } from './login/login';
import { Cart } from './cart/cart';
import { Viewbid } from './viewbid/viewbid';
import { Item_Info } from './item_info/item_info';
import { Sell_Items } from './sell_items/sell_items';
import { AuthState } from './login/authState';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

function App() {
  const [userName, setUserName] = useState(localStorage.getItem('userName') || '');
  const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
  const [authState, setAuthState] = useState(currentAuthState);
  const [latestListing, setLatestListing] = useState(null);
  const [recentListings, setRecentListings] = useState([]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:4000/ws');
    
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'NEW_LISTING') {
        setLatestListing(message.listing);
        setRecentListings(prev => [message.listing, ...prev].slice(0, 5)); // Keep only the 5 most recent
      }
    };

    // Fetch initial listings
    fetch('/api/listings')
      .then(res => res.json())
      .then(data => {
        setRecentListings(data.slice(0, 5)); // Get the 5 most recent listings
      })
      .catch(err => console.error('Error fetching listings:', err));

    return () => ws.close();
  }, []);

  return (
    <BrowserRouter>
      <div className="body bg-light text-dark">
        <header>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="stylesheet" href="main.css" />
          <title>Quick Bid</title>

          <nav>
            <menu>
              <li className="header-links"><NavLink to="login">Login</NavLink></li>
              <li className="header-links"><NavLink to="">Home</NavLink></li>
              <li className="header-links"><NavLink to="login">Accounts</NavLink></li>
              <li className="header-links"><NavLink to="viewbid">View Bids</NavLink></li>
              {authState === AuthState.Authenticated && (
                <li className="header-links"><NavLink to="sell_items">Sell Items</NavLink></li>
              )}
              {authState === AuthState.Authenticated && (
                <li className="header-links"><NavLink to="cart">Cart</NavLink></li>
              )}
            </menu>
          </nav>

          <h1 className="website-title">Quick Bid<sup>&reg;</sup></h1>
          <hr />
          
          {latestListing && (
            <div className="latest-listing">
              <h3>New Item Listed!</h3>
              <p>{latestListing.name} - ${latestListing.cost}</p>
            </div>
          )}
        </header>

        <Routes>
          <Route path='/login' element={<Login 
            userName={userName}
            authState={authState}
            onAuthChange={(userName, authState) => {
              setAuthState(authState);
              setUserName(userName);
            }}
          />} exact />
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/item_info/:id' element={<Item_Info />} />
          <Route path='/sell_items' element={<Sell_Items />} />
          <Route path='/viewbid' element={<Viewbid />} />
          <Route path='*' element={<NotFound />} />
        </Routes>

        <div className="recent-listings">
          <h2>Most Recent Listings</h2>
          <div className="listing-container">
            {recentListings.map((listing, index) => (
              <div key={index} className="listing-item">
                <h3>{listing.name}</h3>
                <p>Price: ${listing.cost}</p>
                <p>Seller: {listing.seller}</p>
                <p>Bids: {listing.bids}/{listing.bidsNeeded}</p>
              </div>
            ))}
          </div>
        </div>

        <footer>
          <a>Rhys Martinsen</a>
          <a className="footer-links" href="https://github.com/RiceChips1000/startup">GitHub</a>
        </footer>
      </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}

export default App;
