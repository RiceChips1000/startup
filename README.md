# Bidder

[My Notes](notes.md)

Website that allows sellers to list items that people may show intrest in by bidding and if enough bids go through the seller must create and ship the product out to the buyers. If not enough bids are placed then no one has to pay for anything.



## 🚀 Specification Deliverable
For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [X] Proper use of Markdown
- [X] A concise and compelling elevator pitch
- [X] Description of key features
- [X] Description of how you will use each technology
- [X] One or more rough sketches of your application. Images must be embedded in this file using Markdown image references.

### Elevator pitch

Imagine a website that allows for a item to be put up by a seller needing a minumun quantity to be sold before producing. Now imagine clients who want to look for things to buy and also get discount, this website will fufill both sides of this allowing sellers to see what people want to buy, and buyers can purchase things they find cool.

### Design

![Design image](BidderDesign.png)

Here is a sequence diagram that shows how to sellers and buyers would interact with the backend to list and buy items.

```mermaid
sequenceDiagram
    actor Seller1
    actor Seller2
    actor Seller3
    Seller1->>Server: Item
    Seller2->>Server: Item
    Seller3->>Server: Item
    Server->>Buyer1: Shows Item
    Buyer1->>Server: Clicks Bid
    Server->>Buyer2: Shows Item
    Buyer2->>Server: Clicks Bid
    Server->>Buyer3: Shows Item
    Buyer3->>Server: Clicks Bid
    actor Buyer1
    actor Buyer2
    actor Buyer3
    
```

### Key features

- Ability to post items to sell/allow people to bid on
- Allow buyers to bid on items they like
- Show how many bids are on each item/how many are needed
- Price listed for every item
- Seperate accounts for buying and selling with secure logins

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - I will use correct HTML to structure my pages. I will have a seller page and a buyer page and pages for the listing items.
- **CSS** - Will make the website look nice and fun to use, good color scheme and a format that works on diffrent screens.
- **React** - Will allow users to login, listing display, display other users bids and use of React for routing and components.
- **Service** - Backend service for:
  - login
  - sending listings out
  - submitting bids
  - showing total bids
- **DB/Login** - Store users, bid data, listing data, Register and login users. Securely store users and only allow bidding on athenticated accounts.
- **WebSocket** - Shows newest bids to users updates as the listings are created

## 🚀 AWS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Server deployed and accessible with custom domain name** - [My server link](https://quickbid.click).

## 🚀 HTML deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

 
- [X] **HTML pages** - I have six html pages that have pretty much everything I need for info and have html all over them
- [X] **Proper HTML element usage** - I used everything correctly and made sure the formating was good and is readable and understandable by me
- [X] **Links** - I added my github link on everypage and also source links that have my Bid images linked to more info and all pages are interconnected
- [X] **Text** - All listings have an amount of bids and cash cost and have a info page with text
- [X] **3rd party API placeholder** - An api that shows pictures of bears to improve users moods so they are more likely to spend more money and also buy things.
- [X] **Images** - I added placeholder images for the seller listings/buyer bids.
- [X] **Login placeholder** - There is a login and it also redirects to a seller/buyer page
- [X] **DB data placeholder** - Input box and submit buttn for login, sellers can sumbit listings with info, listings are pulled from the database and displayed to the users.
- [X] **WebSocket placeholder** - The counting of how many total listings their are to users in real time.

## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [X] **Header, footer, and main content body** - I added css to make the Header footer and main body all look good
- [X] **Navigation elements** - I made the navigation look good and scale nicely with the flex to and go away as you scroll down.
- [X] **Responsive to window resizing** - I added flex so that my website is resizeable and usuable on multiple devices.
- [X] **Application elements** - Made buttons and other input nicer using css and attribures
- [X] **Application text content** - made the text look nicer gave a better font and used opposite colors, white on black and black on white for a consise and modern look.
- [X] **Application images** - placeholder images have been put in where sellers will put in the pictures to have bids placed.

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [X] **Bundled using Vite** - I bundled everything with vite the simon and my website
- [X] **Components** - I Made sure every part of the website has its components and the simon one too
- [X] **Router** - Routing between shirts/clothes and their info and cart items to each items info

## 🚀 React part 2: Reactivity

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [X] **All functionality implemented or mocked out** - I made it so sellers can post listings and take them down, users can bid once on each item and when they do bid it goes into their cart and they can either remove it or buy it which clears their cart.
Set Interval used to clear cart when user has not been active in a while(30 minutes)
- [X] **Hooks** - Used hooks for the bid counting with useState and also the setting of my items for viewing and pulling them from storage I used useEffect on the id fetching which allows the user to see the bids that have all been posted and gets updated or any other listings are posted

A lot of the features here will be flushed out with my data storage I will implement so if anything is buggy it will get fixed :

## 🚀 Service deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.


- [x] **Node.js/Express HTTP service** - Installed Express with NPM. Default port on 4000.js. Node works good!
- [x] **Static middleware for frontend** -  endpoints in `service/index` frontend calls static files and such
- [x] **Calls to third party endpoints** - Cart page calls bear api and loads random bear image that increases the happines of the user which hopefully will make them buy more stuff.
- [x] **Backend service endpoints** - Backend stuff in index, for cart, listings, and viewbid
- [x] **Frontend calls service endpoints** - Frontend fetches and calls all needed information from backend and endpoints work,  and local storage has been phased out users are able to use listings call bids and all of that good stuff
- [x] **Supports registration, login, logout, and restricted endpoint** - Fully supported authentication and restricted access to cart and stuff if user is not logged in and endpoints are restricted.

## 🚀 DB/Login deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [X] **User registration** - User info is stored with mongodb and is remembered
- [X] **User login and logout** - User login and logout works good can only login with their password
- [X] **Stores data in MongoDB** - Bids, usernames and passwords, listings and cart are stored in mongodb
- [X] **Stores credentials in MongoDB** - Passwords and stuff are saved in mongo and encrypted and user info is saved
- [X] **Restricts functionality based on authentication** - Users can only acess cart while logged in and cant bid unless logged in same thing with creating listings.

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Backend listens for WebSocket connection** - it listens for when bids are made/created to show to users
- [x] **Frontend makes WebSocket connection** - recieving any listings that are made
- [x] **Data sent over WebSocket connection** - Listings to all users
- [x] **WebSocket data displayed** - Shows most recent listing works good
- [x] **Application is fully functional** - Everything works and new bids are shown to users will help increase buying as they see new bids are placed
