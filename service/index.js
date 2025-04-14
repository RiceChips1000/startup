const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.argv.length > 2 ? process.argv[2] : 4000;
//const { addTwoNumbers } = require("./module.js") example stuff I was trying for if I add more functions and want to be more organized
//const i = addTwoNumbers(1,2)


app.use(express.json());
app.use(express.static('public'));

// Serve homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Load a user's cart
app.get('/api/cart/:user', (req, res) => {
  const user = req.params.user;
  const cartFile = path.join(__dirname, `cart_${user}.json`);

  if (fs.existsSync(cartFile)) {
    try {
      const data = JSON.parse(fs.readFileSync(cartFile));
      return res.json(data.cart);
    } catch (err) {
      console.error("Failed to read cart:", err);
      return res.status(500).send("Server error reading cart.");
    }
  }

  // No cart found
  res.json([]);
});

// Save/update a user's cart
app.post('/api/cart/:user', (req, res) => {
  const user = req.params.user;
  const cartData = {
    cart: req.body,
    timestamp: Date.now(),
  };

  const cartFile = path.join(__dirname, `cart_${user}.json`);

  try {
    fs.writeFileSync(cartFile, JSON.stringify(cartData));
    res.sendStatus(200);
  } catch (err) {
    console.error("Failed to write cart:", err);
    res.status(500).send("Server error saving cart.");
  }
});

// catches all the routes
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});