import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Play } from './play/play';
import { Scores } from './scores/scores';
import { About } from './about/about';
import { Item_Info } from './item_info/item_info';
import { Sell_Items } from './sell_items/sell_items';

export default function App() {
  return (
    <BrowserRouter>
    <div className="body bg-dark text-light">
    <header>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <link rel="stylesheet" href="main.css" />



  <title>Quick Bid</title>
  

    <nav>
      <menu>
        <li className="header-links"><a href="accounts.html">Login</a></li>
        <li className="header-links"><a href="index.html">Home</a></li>
        <li className="header-links"><a href="accounts.html">Accounts</a></li>
        <li className="header-links"><a href="viewbid.html">View Bids</a></li>
        <li className="header-links"><a href="sell_items.html">Sell Items</a></li>
        <li className="header-links"><a href="cart.html">Cart</a></li>
      </menu>
    </nav>

  <h1 className="website-title">Quick Bid<sup>&reg;</sup></h1>
    <hr />
  </header>

  <h1 className="specific-page-title">Top Bids</h1>

  <Routes>
    <Route path='/' element={<Home />} exact />
    <Route path='/accounts' element={<Accounts />} />
    <Route path='/cart' element={<Cart />} />
    <Route path='/item_info' element={<Item_Info />} />
    <Route path='/sell_items' element={<Sell_Items />} />
    <Route path='/viewbid' element={<Viewbid />} />
    <Route path='*' element={<NotFound />} />
  </Routes>

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