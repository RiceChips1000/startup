onst express = require('express');
const path = require('path');
const app = express();
const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.static('public')); // serve static frontend files
app.use(express.json()); // parse JSON request bodies

// In-memory cart store and timers
const cartStore = new Map();        // user => cart items
const cartTimers = new Map();       // user => timeout ID

// Save/update cart for user and reset inactivity timer
function saveCartForUser(user, cartItems) {
  cartStore.set(user, cartItems);

  // Clear old timer
  if (cartTimers.has(user)) {
    clearTimeout(cartTimers.get(user));
  }

  // Set new 30-minute auto-clear timer
  const timeoutId = setTimeout(() => {
    cartStore.delete(user);
    cartTimers.delete(user);
    console.log(`Cart for user "${user}" auto-cleared after 30 mins.`);
  }, 30 * 60 * 1000); // 30 minutes

  cartTimers.set(user, timeoutId);
}

// API: Get cart for user
app.get('/api/cart/:user', (req, res) => {
  const user = req.params.user;
  const cart = cartStore.get(user) || [];
  res.json(cart);
});

// API: Update cart for user
app.post('/api/cart/:user', (req, res) => {
  const user = req.params.user;
  const cartItems = req.body;

  saveCartForUser(user, cartItems);
  res.json({ message: "Cart updated" });
});

// Catch-all route for React Router frontend routes like /cart, /viewbid, etc.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`✅ Server listening on port ${port}`);
});