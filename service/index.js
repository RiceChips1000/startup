const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const app = express();

const authCookieName = 'token';
const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

let users = [];
let listings = [];
let userCarts = {}; // key: user email, value: array of cart items

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// Auth stuff
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
  if (user) {
    delete user.token;
  }
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

// Listing Stuff
apiRouter.get('/listings', (_req, res) => {
  res.send(listings);
});

apiRouter.post('/listings', verifyAuth, (req, res) => {
  const listing = {
    ...req.body,
    bids: 0,
    seller: req.user.email,
  };
  listings.push(listing);
  res.send({ success: true });
});

apiRouter.get('/listings/:id', (req, res) => {
  const listing = listings[parseInt(req.params.id)];
  if (listing) res.send(listing);
  else res.status(404).send({ msg: 'Not found' });
});

apiRouter.delete('/listings/:id', verifyAuth, (req, res) => {
  const index = parseInt(req.params.id);
  const listing = listings[index];
  if (!listing) return res.status(404).send({ msg: 'Not found' });

  if (listing.seller !== req.user.email) {
    return res.status(403).send({ msg: 'Forbidden' });
  }

  listings.splice(index, 1);

  // Remove from all user carts
  for (const userEmail in userCarts) {
    userCarts[userEmail] = userCarts[userEmail].filter(i => i.name !== listing.name);
  }

  res.send({ msg: 'Deleted' });
});

//Cart Stuff
apiRouter.get('/cart', verifyAuth, (req, res) => {
  const cart = userCarts[req.user.email] || [];
  res.send(cart);
});

apiRouter.post('/cart/add', verifyAuth, (req, res) => {
  const item = req.body;
  const userEmail = req.user.email;

  if (!userCarts[userEmail]) {
    userCarts[userEmail] = [];
  }

  // Avoid duplicates
  if (userCarts[userEmail].some(i => i.name === item.name)) {
    return res.status(400).send({ msg: 'Already added' });
  }

  // Increment bid count in listings
  const listing = listings.find(i => i.name === item.name);
  if (listing) {
    listing.bids += 1;
  }

  userCarts[userEmail].push(item);
  res.send({ msg: 'Added to cart' });
});

apiRouter.post('/cart/remove', verifyAuth, (req, res) => {
  const userEmail = req.user.email;
  const name = req.body.name;

  if (userCarts[userEmail]) {
    userCarts[userEmail] = userCarts[userEmail].filter(i => i.name !== name);
  }

  res.send({ msg: 'Removed from cart' });
});

apiRouter.post('/cart/clear', verifyAuth, (req, res) => {
  userCarts[req.user.email] = [];
  res.send({ msg: 'Cart cleared' });
});

// ---------- UTILITY ----------
async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);
  const user = { email, password: passwordHash, token: uuid.v4() };
  users.push(user);
  return user;
}

async function findUser(field, value) {
  if (!value) return null;
  return users.find(u => u[field] === value);
}

function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});