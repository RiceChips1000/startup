const express = require('express');
const path = require('path');
const app = express();
const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.static('public')); 
app.use(express.json()); 


const cartStore = new Map();        
const cartTimers = new Map();       


function saveCartForUser(user, cartItems) {
  cartStore.set(user, cartItems);

  
  if (cartTimers.has(user)) {
    clearTimeout(cartTimers.get(user));
  }

  
  const timeoutId = setTimeout(() => {
    cartStore.delete(user);
    cartTimers.delete(user);
    console.log(`Cart for user "${user}" auto-cleared after 30 mins.`);
  }, 30 * 60 * 1000); // 30 minutes

  cartTimers.set(user, timeoutId);
}


app.get('/api/cart/:user', (req, res) => {
  const user = req.params.user;
  const cart = cartStore.get(user) || [];
  res.json(cart);
});


app.post('/api/cart/:user', (req, res) => {
  const user = req.params.user;
  const cartItems = req.body;

  saveCartForUser(user, cartItems);
  res.json({ message: "Cart updated" });
});


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`✅ Server listening on port ${port}`);
});