import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './item_object.css';

export function ListingItemInfo() {
    const [values, setValues] = useState({
        name: '',
        cost: '',
        bids: '',
        image: null
    });

    const handleChanges = (e) => {
        if (e.target.type === "file") {
            setValues({ ...values, [e.target.name]: e.target.files[0] });
        } else {
            setValues({ ...values, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        let storedValues = { ...values };

        // Convert image file to a URL if an image is uploaded
        if (storedValues.image) {
            storedValues.image = URL.createObjectURL(storedValues.image);
        }

        // Retrieve existing items from localStorage
        let existingItems = JSON.parse(localStorage.getItem('listingItems')) || [];

        // Add the new item to the list
        existingItems.push(storedValues);

        // Save the updated list back to localStorage
        localStorage.setItem('listingItems', JSON.stringify(existingItems));

        alert("Item saved to local storage!");

        // Reset the form
        setValues({
            name: '',
            cost: '',
            bids: '',
            image: null
        });
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h1>List Item</h1>

                <label htmlFor="name">Product Name*</label>
                <input 
                    type="text" 
                    placeholder='Enter Product Name' 
                    name='name'
                    value={values.name}
                    onChange={handleChanges} 
                    required 
                />

                <label htmlFor="cost">Price*</label>
                <input 
                    type="text" 
                    placeholder='Enter Cost In Dollars' 
                    name='cost'
                    value={values.cost}
                    onChange={handleChanges} 
                    required 
                />

                <label htmlFor="bids">Bids Needed*</label>
                <input 
                    type="text" 
                    placeholder='Enter Number Of Bids Needed' 
                    name='bids'
                    value={values.bids}
                    onChange={handleChanges} 
                    required 
                />

                <label htmlFor="image">Image</label>
                <input 
                    type="file" 
                    name='image'
                    onChange={handleChanges}
                />

                <button type='reset' onClick={() => setValues({
                    name: '',
                    cost: '',
                    bids: '',
                    image: null
                })}>Reset</button>
                <button type='submit'>Submit</button>
            </form>
        </div>
    );
}