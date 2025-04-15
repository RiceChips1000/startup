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
apiRouter.post('/auth/create', async (req, res) => {
  if (await findUser('email', req.body.email)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await createUser(req.body.email, req.body.password);
    setAuthCookie(res, user.token);
    res.send({ email: user.email });
  }
});

apiRouter.post('/auth/login', async (req, res) => {
  const user = await findUser('email', req.body.email);
  if (user && await bcrypt.compare(req.body.password, user.password)) {
    user.token = uuid.v4();
    setAuthCookie(res, user.token);
    res.send({ email: user.email });
    return;
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

apiRouter.delete('/auth/logout', async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) delete user.token;
  res.clearCookie(authCookieName);
  res.status(204).end();
});

const verifyAuth = async (req, res, next) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    req.user = user;
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
};

// ---------- LISTINGS ROUTES ----------

// Create a new listing
apiRouter.post('/listings', verifyAuth, (req, res) => {
  const listing = { ...req.body, bids: 0, seller: req.user.email };
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
apiRouter.post('/listings/:id/bid', verifyAuth, (req, res) => {
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
apiRouter.delete('/listings/:id', verifyAuth, (req, res) => {
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
apiRouter.get('/cart', verifyAuth, (req, res) => {
  const userEmail = req.user.email;
  res.send(carts[userEmail] || []);
});

// Remove item from cart
apiRouter.post('/cart/remove', verifyAuth, (req, res) => {
  const userEmail = req.user.email;
  const itemName = req.body.name;

  carts[userEmail] = (carts[userEmail] || []).filter(item => item.name !== itemName);
  res.send({ msg: 'Item removed from cart' });
});

// Purchase cart
apiRouter.post('/cart/purchase', verifyAuth, (req, res) => {
  const userEmail = req.user.email;
  carts[userEmail] = [];
  res.send({ msg: 'Purchase complete, cart cleared!' });
});

// ---------- HELPERS ----------

async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);
  const user = { email, password: passwordHash, token: uuid.v4() };
  users.push(user);
  return user;
}

async function findUser(field, value) {
  if (!value) return null;
  return users.find((u) => u[field] === value);
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
  res.status(500).send({ type: err.name, message: err.message });
});

app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
