import React from 'react';
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
  const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
  const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
  const [authState, setAuthState] = React.useState(currentAuthState);
  
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

export default App;
