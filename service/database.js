const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
console.log('Attempting to connect to MongoDB with URL:', url.replace(config.password, '****'));

const client = new MongoClient(url);
const db = client.db('bidder');
const userCollection = db.collection('user');
const listingCollection = db.collection('listing');
const bidCollection = db.collection('bid');
const cartCollection = db.collection('cart');

// Test database connection
(async function testConnection() {
  try {
    await client.connect();
    console.log('Successfully connected to MongoDB client');
    
    await db.command({ ping: 1 });
    console.log('Successfully pinged the  database');
    
    // Test collections
    const collections = await db.listCollections().toArray();
    console.log('Available collections:', collections.map(c => c.name));
    
    // Test a simple operation
    const userCount = await userCollection.countDocuments();
    console.log(`Current number of users in database: ${userCount}`);
    
  } catch (ex) {
    console.error('Database connection error:', ex);
    process.exit(1);
  }
})();

// User functions
async function getUser(email) {
  return await userCollection.findOne({ email: email });
}

async function getUserByToken(token) {
  return await userCollection.findOne({ token: token });
}

async function addUser(user) {
  await userCollection.insertOne(user);
}

async function updateUser(user) {
  await userCollection.updateOne({ email: user.email }, { $set: user });
}

// Listing functions
async function addListing(listing) {
  return await listingCollection.insertOne(listing);
}

async function getListings() {
  return await listingCollection.find({}).toArray();
}

async function getListingById(id) {
  return await listingCollection.findOne({ _id: id });
}

async function updateListing(id, updates) {
  return await listingCollection.updateOne(
    { _id: id },
    { $set: updates }
  );
}

async function deleteListing(id) {
  console.log(listingCollection)
  return await listingCollection.deleteOne({ _id: id });
}

// Bid functions
async function addBid(bid) {
  return await bidCollection.insertOne(bid);
}

async function getBidsForListing(listingId) {
  return await bidCollection.find({ listingId: listingId }).toArray();
}

async function getBidsForUser(userEmail) {
  return await bidCollection.find({ userEmail: userEmail }).toArray();
}

// Cart functions
async function getCart(userEmail) {
  return await cartCollection.findOne({ userEmail: userEmail });
}

async function updateCart(userEmail, items) {
  return await cartCollection.updateOne(
    { userEmail: userEmail },
    { $set: { items: items } },
    { upsert: true }
  );
}

async function clearCart(userEmail) {
  return await cartCollection.deleteOne({ userEmail: userEmail });
}

module.exports = {
  // User functions
  getUser,
  getUserByToken,
  addUser,
  updateUser,
  
  // Listing functions
  addListing,
  getListings,
  getListingById,
  updateListing,
  deleteListing,
  
  // Bid functions
  addBid,
  getBidsForListing,
  getBidsForUser,
  
  // Cart functions
  getCart,
  updateCart,
  clearCart
};

