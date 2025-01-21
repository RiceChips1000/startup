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
- **WebSocket** - As each user bids, total bids are listed to all users. As sellers send out listings, new listings are populated for all users.

## 🚀 AWS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Server deployed and accessible with custom domain name** - [My server link](https://yourdomainnamehere.click).

## 🚀 HTML deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **HTML pages** - I did not complete this part of the deliverable.
- [ ] **Proper HTML element usage** - I did not complete this part of the deliverable.
- [ ] **Links** - I did not complete this part of the deliverable.
- [ ] **Text** - I did not complete this part of the deliverable.
- [ ] **3rd party API placeholder** - I did not complete this part of the deliverable.
- [ ] **Images** - I did not complete this part of the deliverable.
- [ ] **Login placeholder** - I did not complete this part of the deliverable.
- [ ] **DB data placeholder** - I did not complete this part of the deliverable.
- [ ] **WebSocket placeholder** - I did not complete this part of the deliverable.

## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Header, footer, and main content body** - I did not complete this part of the deliverable.
- [ ] **Navigation elements** - I did not complete this part of the deliverable.
- [ ] **Responsive to window resizing** - I did not complete this part of the deliverable.
- [ ] **Application elements** - I did not complete this part of the deliverable.
- [ ] **Application text content** - I did not complete this part of the deliverable.
- [ ] **Application images** - I did not complete this part of the deliverable.

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Bundled using Vite** - I did not complete this part of the deliverable.
- [ ] **Components** - I did not complete this part of the deliverable.
- [ ] **Router** - Routing between login and voting components.

## 🚀 React part 2: Reactivity

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **All functionality implemented or mocked out** - I did not complete this part of the deliverable.
- [ ] **Hooks** - I did not complete this part of the deliverable.

## 🚀 Service deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Node.js/Express HTTP service** - I did not complete this part of the deliverable.
- [ ] **Static middleware for frontend** - I did not complete this part of the deliverable.
- [ ] **Calls to third party endpoints** - I did not complete this part of the deliverable.
- [ ] **Backend service endpoints** - I did not complete this part of the deliverable.
- [ ] **Frontend calls service endpoints** - I did not complete this part of the deliverable.

## 🚀 DB/Login deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **User registration** - I did not complete this part of the deliverable.
- [ ] **User login and logout** - I did not complete this part of the deliverable.
- [ ] **Stores data in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Stores credentials in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Restricts functionality based on authentication** - I did not complete this part of the deliverable.

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Backend listens for WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Frontend makes WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Data sent over WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **WebSocket data displayed** - I did not complete this part of the deliverable.
- [ ] **Application is fully functional** - I did not complete this part of the deliverable.
