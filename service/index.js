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