const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const app = express();

const authCookieName = 'token';

let users = [];
let listings = [];
let carts = {}; // { email: [cartItems] }

// The service port
const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// ---------- AUTH ROUTES ----------
apiRouter.post('/auth/create', async (req, res, next) => {
  console.log('Create user request received:', { email: req.body.email });
  try {
    if (!req.body.email || !req.body.password) {
      console.log('Missing email or password');
      return res.status(400).send({ msg: 'Email and password are required' });
    }
    const existingUser = await findUser('email', req.body.email);
    if (existingUser) {
      console.log('User already exists:', req.body.email);
      res.status(409).send({ msg: 'Existing user' });
    } else {
      console.log('Creating new user:', req.body.email);
      const user = await createUser(req.body.email, req.body.password);
      setAuthCookie(res, user.token);
      console.log('User created successfully:', req.body.email);
      res.send({ email: user.email });
    }
  } catch (error) {
    console.error('Error in create user:', error);
    next(error);
  }
});

apiRouter.post('/auth/login', async (req, res, next) => {
  console.log('Login attempt for:', req.body.email);
  try {
    if (!req.body.email || !req.body.password) {
      console.log('Missing email or password');
      return res.status(400).send({ msg: 'Email and password are required' });
    }
    const user = await findUser('email', req.body.email);
    console.log('User found:', !!user);
    
    if (user) {
      const passwordMatch = await bcrypt.compare(req.body.password, user.password);
      console.log('Password match:', passwordMatch);
      
      if (passwordMatch) {
        user.token = uuid.v4();
        setAuthCookie(res, user.token);
        console.log('Login successful:', req.body.email);
        res.send({ email: user.email });
        return;
      }
    }
    console.log('Login failed - unauthorized');
    res.status(401).send({ msg: 'Unauthorized' });
  } catch (error) {
    console.error('Error in login:', error);
    next(error);
  }
});

apiRouter.delete('/auth/logout', async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) delete user.token;
  res.clearCookie(authCookieName);
  res.status(204).end();
});

const verifyAuth = async (req, res, next) => {
  console.log('Verifying auth token');
  try {
    const token = req.cookies[authCookieName];
    console.log('Token present:', !!token);
    
    if (!token) {
      console.log('No token found');
      return res.status(401).send({ msg: 'Unauthorized' });
    }
    
    const user = await findUser('token', token);
    console.log('User found for token:', !!user);
    
    if (user) {
      req.user = user;
      next();
    } else {
      console.log('Invalid token');
      res.status(401).send({ msg: 'Unauthorized' });
    }
  } catch (error) {
    console.error('Error in verifyAuth:', error);
    next(error);
  }
};

// ---------- LISTINGS ROUTES ----------

// Create a new listing
apiRouter.post('/listings', (req, res) => {
  console.log('Received listing data:', req.body); // <-- Log for debugging
  
  const { name, cost, bidsNeeded, about, image } = req.body;

  if (!name || !cost || !bidsNeeded || !about) {
    return res.status(400).send({ msg: 'Missing required fields' });
  }

  const listing = {
    name,
    cost,
    bidsNeeded,
    about,
    image: image || null,
    bids: 0,
    seller: req.user.email,
  };

  listings.push(listing);
  res.send({ msg: 'Listing created', listing });
});

// Get all listings
apiRouter.get('/listings', (_req, res) => {
console.log('GET /api/listings called');
  res.send(listings);
});

// Get a specific listing by index
apiRouter.get('/listings/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const listing = listings[id];
  if (!listing) return res.status(404).send({ msg: 'Listing not found' });
  res.send(listing);
});

// Bid on a listing
apiRouter.post('/listings/:id/bid', (req, res) => {
  const id = parseInt(req.params.id);
  const listing = listings[id];
  if (!listing) return res.status(404).send({ msg: 'Item not found' });

  const userEmail = req.user.email;
  carts[userEmail] = carts[userEmail] || [];

  const alreadyBid = carts[userEmail].some(item => item.name === listing.name);
  if (alreadyBid) return res.status(400).send({ msg: 'Already bid on this item' });

  listing.bids += 1;
  carts[userEmail].push(listing);

  res.send({ msg: 'Bid placed', updatedListing: listing });
});

// Remove listing (seller only)
apiRouter.delete('/listings/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const listing = listings[id];
  if (!listing) return res.status(404).send({ msg: 'Item not found' });

  if (listing.seller !== req.user.email) {
    return res.status(403).send({ msg: 'Only the seller can remove this item' });
  }

  listings.splice(id, 1);
  carts[req.user.email] = (carts[req.user.email] || []).filter(item => item.name !== listing.name);

  res.send({ msg: 'Item removed' });
});

// ---------- CART ROUTES ----------

// Get cart
apiRouter.get('/cart', (req, res) => {
  const userEmail = req.user.email;
  res.send(carts[userEmail] || []);
});

// Remove item from cart
apiRouter.post('/cart/remove', (req, res) => {
  const userEmail = req.user.email;
  const itemName = req.body.name;

  carts[userEmail] = (carts[userEmail] || []).filter(item => item.name !== itemName);
  res.send({ msg: 'Item removed from cart' });
});

// Purchase cart
apiRouter.post('/cart/purchase', (req, res) => {
  const userEmail = req.user.email;
  carts[userEmail] = [];
  res.send({ msg: 'Purchase complete, cart cleared!' });
});

// ---------- HELPERS ----------

async function createUser(email, password) {
  console.log('Creating user in database');
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const user = { email, password: passwordHash, token: uuid.v4() };
    users.push(user);
    console.log('User created in database:', email);
    return user;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

async function findUser(field, value) {
  console.log(`Finding user by ${field}:`, value);
  try {
    if (!value) {
      console.log('No value provided for findUser');
      return null;
    }
    const user = users.find((u) => u[field] === value);
    console.log('User found:', !!user);
    return user;
  } catch (error) {
    console.error('Error finding user:', error);
    throw error;
  }
}

function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

// ---------- DEFAULT ROUTES ----------

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send({ 
    type: err.name, 
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
