const express = require('express');
const app = express();
const port = process.argv.length > 2 ? process.argv[2] : 4000;
const path = require('path');

app.use(express.static('public'));
app.use(express.json());

// In-memory cart store (you'd replace this with a database eventually)
const userCarts = {};

// Middleware to auto-clear carts after 30 mins
const AUTO_CLEAR_TIME = 30 * 60 * 1000; // 30 minutes

function clearOldCarts() {
  const now = Date.now();
  for (const user in userCarts) {
    if (now - userCarts[user].lastUpdated > AUTO_CLEAR_TIME) {
      console.log(`Auto-clearing cart for ${user}`);
      delete userCarts[user];
    }
  }
}
setInterval(clearOldCarts, 60 * 1000); // Run every minute

// GET cart
app.get('/api/cart/:user', (req, res) => {
  const user = req.params.user;
  const cart = userCarts[user]?.items || [];
  res.json(cart);
});

// POST (update) cart
app.post('/api/cart/:user', (req, res) => {
  const user = req.params.user;
  const items = req.body;
  userCarts[user] = {
    items,
    lastUpdated: Date.now()
  };
  res.status(200).send('Cart updated');
});

// Serve frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});