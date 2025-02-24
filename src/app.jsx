import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Play } from './play/play';
import { Scores } from './scores/scores';
import { About } from './about/about';

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

  <main className='containerName-fluid bg-secondary text-center'>App components go here</main>
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