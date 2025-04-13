const express = require('express');
const app = express();
const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json()); 
app.use(express.static('public')); 

let listings = [];
let userCarts = {};

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// My Api Routes

// Get all listings
app.get('/api/listings', (req, res) => {
  res.json(listings);
});

// Add a new listing
app.post('/api/listings', (req, res) => {
  listings.push(req.body);
  res.status(201).json({ message: "Listing added" });
});

// Get user cart
app.get('/api/cart/:user', (req, res) => {
    const user = req.params.user;
    res.json(userCarts[user] || []);
  });
  
  // Update user cart
  app.post('/api/cart/:user', (req, res) => {
    const user = req.params.user;
    userCarts[user] = req.body;
    res.json({ message: "Cart updated" });
  });
  
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });