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
        console.log(values);
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h1>List Item</h1>

                <label htmlFor="name">Product Name*</label>
                <input type="text" placeholder='Enter Product Name' name='name'
                    onChange={handleChanges} required />

                <label htmlFor="cost">Price*</label>
                <input type="text" placeholder='Enter Cost In Dollars' name='cost'
                    onChange={handleChanges} required />

                <label htmlFor="bids">Bids Needed*</label>
                <input type="text" placeholder='Enter Number Of Bids Needed' name='bids'
                    onChange={handleChanges} required />

                <label htmlFor="image">Image</label>
                <input type="file" placeholder='File From Computer' name='image'
                    onChange={handleChanges}/>

                <button type='reset'>Reset</button>
                <button type='submit'>Submit</button>
            </form>
        </div>
    );
}