const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const db = require('./database.js');
const app = express();

const authCookieName = 'token';

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
    const existingUser = await db.getUser(req.body.email);
    if (existingUser) {
      console.log('User already exists:', req.body.email);
      res.status(409).send({ msg: 'Existing user' });
    } else {
      console.log('Creating new user:', req.body.email);
      const passwordHash = await bcrypt.hash(req.body.password, 10);
      const user = {
        email: req.body.email,
        password: passwordHash,
        token: uuid.v4()
      };
      await db.addUser(user);
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
    const user = await db.getUser(req.body.email);
    console.log('User found:', !!user);
    
    if (user) {
      const passwordMatch = await bcrypt.compare(req.body.password, user.password);
      console.log('Password match:', passwordMatch);
      
      if (passwordMatch) {
        user.token = uuid.v4();
        await db.updateUser(user);
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
  const user = await db.getUser(req.cookies[authCookieName]);
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
    
    const user = await db.getUser(req.cookies[authCookieName]);
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
apiRouter.get('/listings', async (_req, res) => {
  try {
    const listings = await db.getListings();
    res.send(listings);
  } catch (error) {
    console.error('Error getting listings:', error);
    res.status(500).send({ msg: 'Error getting listings' });
  }
});

apiRouter.post('/listings', async (req, res) => {
  try {
    const listing = {
      ...req.body,
      bids: 0,
      createdAt: new Date()
    };
    await db.addListing(listing);
    res.send({ msg: 'Listing created', listing });
  } catch (error) {
    console.error('Error creating listing:', error);
    res.status(500).send({ msg: 'Error creating listing' });
  }
});

// Get a specific listing by ID
apiRouter.get('/listings/:id', async (req, res) => {
  try {
    const listingId = req.params.id;
    let listing;
    
    // Try to find listing by MongoDB ID first
    try {
      console.log("listingId", listingId)
      listing = await db.getListingById(listingId);
      if (!listing) {
        console.log("listing not found")
        throw new Error("Listing not found");
      }
    } catch (error) {
      // If that fails, try to find by index

      /**
       * THIS IS THE IMPORTANT PART   SURE YOU UNDERSTAND IT
       */
      console.log("manually finding listing by index")
      const listings = await db.getListings();
      const index = parseInt(listingId);
      if (isNaN(index) || index < 0 || index >= listings.length) {
        return res.status(404).send({ msg: 'Listing not found' });
      }
      listing = listings[index];
    }

    if (!listing) {
      console.log("listing not found")
      return res.status(404).send({ msg: 'Listing not found' });
    }
    console.log("listing", listing)
    res.send(listing);
  } catch (error) {
    console.error('Error getting listing:', error);
    res.status(500).send({ msg: 'Error getting listing' });
  }
});

// Bid on a listing
apiRouter.post('/listings/:id/bid', async (req, res) => {
  try {
    const listingId = req.params.id;
    let listing;
    
    // Try to find listing by MongoDB ID first
    try {
      listing = await db.getListingById(listingId);
      if (!listing) {
        throw new Error("Listing not found");
      }
    } catch (error) {
      // If that fails, try to find by index
      const listings = await db.getListings();
      const index = parseInt(listingId);
      if (isNaN(index) || index < 0 || index >= listings.length) {
        return res.status(404).send({ msg: 'Listing not found' });
      }
      listing = listings[index];
    }
    
    if (!listing) {
      return res.status(404).send({ msg: 'Listing not found' });
    }

    //console.log("manually finding listing by index")
    //  const listings = await db.getListings();
    //  const index = parseInt(listingId);
    //  if (isNaN(index) || index < 0 || index >= listings.length) {
    //    return res.status(404).send({ msg: 'Listing not found' });
    //  }
    const bid = {
      listingId: listing._id || listingId,
      userEmail: req.body.userEmail,
      amount: req.body.amount,
      createdAt: new Date()
    };

    

    // Add to cart
    const cart = await db.getCart(req.body.userEmail) || { items: [] };
    console.log("cart", cart)
    const itemAlreadyInCart = cart.items.some(item => item._id.equals(listing._id) || item._id.equals(listingId));
    console.log("listing._id", listing._id)
    console.log("listingId", listingId)
    if (!itemAlreadyInCart) {
      await db.addBid(bid);
      listing.bids += 1;
      await db.updateListing(listing._id || listingId, { bids: listing.bids });
      cart.items.push({
        _id: listing._id || listingId,
        name: listing.name,
        cost: listing.cost,
        image: listing.image,
        seller: listing.seller
      });
      await db.updateCart(req.body.userEmail, cart.items);
    }
    else {
      return res.status(400).send({ msg: 'Item already in cart' });
    }

    res.send({ msg: 'Bid placed', listing });
  } catch (error) {
    console.error('Error placing bid:', error);
    res.status(500).send({ msg: 'Error placing bid' });
  }
});

// Remove listing (seller only)
apiRouter.delete('/listings/:id', async (req, res) => {
  try {
    const listingId = req.params.id;
    const { userEmail } = req.body;
    
    if (!userEmail) {
      return res.status(401).send({ msg: 'User email is required' });
    }

    let listing;
    try {
      listing = await db.getListingById(listingId);
      if (!listing) {
        console.log("listing not found, trying manual search")
        throw new Error("Listing not found");
      }
    } catch (error) {
      // If that fails, try to find by index
      const listings = await db.getListings();
      const index = parseInt(listingId);
      console.log("index", index)
      if (isNaN(index) || index < 0 || index >= listings.length) {
        return res.status(404).send({ msg: 'Listing not found' });
      }
      listing = listings[index];
    }

    if (!listing) {
      return res.status(404).send({ msg: 'Listing not found' });
    }

    if (listing.seller !== userEmail) {
      return res.status(403).send({ msg: 'Only the seller can remove this item' });
    }

    await db.deleteListing(listing._id || listingId);
    res.send({ msg: 'Item removed successfully' });
  } catch (error) {
    console.error('Error removing listing:', error);
    res.status(500).send({ msg: 'Error removing listing' });
  }
});
 //
// ---------- CART ROUTES -----------
apiRouter.get('/cart', async (req, res) => {
  try {
    // Get user from auth token
    const token = req.cookies[authCookieName];
    if (!token) {
      return res.status(401).send({ msg: 'Unauthorized' });
    }
    const user = await db.getUserByToken(token);
    if (!user) {
      return res.status(401).send({ msg: 'Unauthorized' });
    }

    console.log("getting cart for", user.email)
    const cart = await db.getCart(user.email);
    res.send(cart?.items || []);
  } catch (error) {
    console.error('Error getting cart:', error);
    res.status(500).send({ msg: 'Error getting cart' });
  }
});

apiRouter.post('/cart/remove', async (req, res) => {
  try {
    const token = req.cookies[authCookieName];
    if (!token) {
      return res.status(401).send({ msg: 'Unauthorized' });
    }
    const user = await db.getUserByToken(token);
    if (!user) {
      return res.status(401).send({ msg: 'Unauthorized' });
    }
    const userEmail = user.email;
    const itemName = req.body.name;
    const cart = await db.getCart(userEmail);
    console.log("cart (in remove function)", cart)
    if (cart) {
      await db.removeFromCart(userEmail, itemName);
      res.send({ msg: 'Item removed from cart' });
    }
    else {
      return res.status(400).send({ msg: 'Item not in cart' });
    }
    
  } catch (error) {
    console.error('Error removing from cart:', error);
    res.status(500).send({ msg: 'Error removing from cart' });
  }
});

apiRouter.post('/cart/purchase', async (req, res) => {
  try {
    const { userEmail } = req.body;
    await db.clearCart(userEmail);
    res.send({ msg: 'Purchase complete, cart cleared!' });
  } catch (error) {
    console.error('Error purchasing cart:', error);
    res.status(500).send({ msg: 'Error purchasing cart' });
  }
});

// ---------- HELPERS ----------

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
