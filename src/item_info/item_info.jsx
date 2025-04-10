import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

export function Item_Info() {
  const [item, setItem] = useState(null)
  const { id } = useParams()
  const navigate = useNavigate()
  const userName = localStorage.getItem('userName') // Grab the logged-in user's name from localStorage
  const [bids, setBids] = useState(0)

  const handleBid = () => {
    // Check if the user is logged in first
    if (!userName) {
      alert("You gotta be logged in to place a bid")
      navigate('/login') // Redirect them to login if not logged in
      return
    }

    // Get the item from localStorage
    const storedListings = JSON.parse(localStorage.getItem('listingItems')) || []
    const foundItem = storedListings[parseInt(id)]

    // Make sure the user hasn't already bid on this item
    let userCart = JSON.parse(localStorage.getItem('userCart')) || []
    const alreadyBid = userCart.some(cartItem => cartItem.name === foundItem.name)

    if (alreadyBid) {
      alert("You've already bid on this item")
      return
    }

    // Increment the bid count
    const updatedBids = foundItem.bids + 1
    foundItem.bids = updatedBids

    // Update the listings in localStorage
    storedListings[parseInt(id)] = foundItem
    localStorage.setItem('listingItems', JSON.stringify(storedListings))

    // Add the item to the user's cart
    userCart.push(foundItem)
    localStorage.setItem('userCart', JSON.stringify(userCart))

    // Update the local bid state to reflect the change
    setBids(updatedBids)
  }

  const handleRemoveItem = () => {
    // Remove the item from the listing in localStorage
    const storedListings = JSON.parse(localStorage.getItem('listingItems')) || []
    const updatedListings = storedListings.filter((listing, index) => index !== parseInt(id))
    localStorage.setItem('listingItems', JSON.stringify(updatedListings))

    // Remove the item from the user's cart if it’s there
    let userCart = JSON.parse(localStorage.getItem('userCart')) || []
    userCart = userCart.filter(item => item.name !== item.name)
    localStorage.setItem('userCart', JSON.stringify(userCart))

    alert("Item successfully removed")
    window.location.href = '/' // Redirect them to the homepage
  }

  useEffect(() => {
    // Load the item from localStorage when the component mounts
    const storedListings = JSON.parse(localStorage.getItem('listingItems')) || []
    const foundItem = storedListings[parseInt(id)]

    if (foundItem) {
      setItem(foundItem)
      setBids(foundItem.bids) // Set the initial bid count
    } else {
      console.error("Oops, item not found")
    }
  }, [id])

  if (!item) return <p>Loading item...</p>

  return (
    <main>
      <h1>Item Info</h1>
      <div className="bid-item">
        <img src={item.image || "/ShirtDemo.png"} width="200" alt={item.name} className="img-fluid" />
        <p>{item.name} | ${item.cost} | {bids}/{item.bidsNeeded} Bids</p>
        <p>Seller: {item.seller}</p>
      </div>
      <p>{item.about}</p>

      {/* The Bid button */}
      <h3><button onClick={handleBid}>Bid</button></h3>

      {/* Seller-specific "Remove Item" button */}
      {item.seller === userName && (
        <div>
          <button onClick={handleRemoveItem}>Remove Item</button>
        </div>
      )}
    </main>
  )
}