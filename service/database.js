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
    console.log('Successfully pinged the database');
    
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
function getUser(email) {
    console.log('Getting user with email:', email);
  return userCollection.findOne({ email: email });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function addUser(user) {
  await userCollection.insertOne(user);
}

async function updateUser(user) {
  await userCollection.updateOne({ email: user.email }, { $set: user });
}



module.exports = {
  // User functions
  getUser,
  getUserByToken,
  addUser,
  updateUser,
  

};

