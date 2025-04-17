import React, { useState } from 'react';
import './item_object.css';

export function ListingItemInfo() {
  const [values, setValues] = useState({
    name: '',
    cost: '',
    bidsNeeded: '',
    about: '',
    image: null,
    seller: ''
  });
  const userName = localStorage.getItem('userName');

  const handleChanges = (e) => {
    const { name, value, type, files } = e.target;
    setValues({
      ...values,
      [name]: type === 'file' ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userName) {
      alert("You need to be logged in to create a listing.");
      return;
    }

    const formData = {
      ...values,
      image: values.image ? URL.createObjectURL(values.image) : null,
      seller: userName
    };

    const response = await fetch('/api/listings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert('Listing created!');
      setValues({
        name: '',
        cost: '',
        bidsNeeded: '',
        about: '',
        image: null
      });
    } else {
      const err = await response.json();
      alert(err.msg || 'Error creating listing');
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>List Item</h1>

        <label>Product Name*</label>
        <input type="text" name="name" value={values.name} onChange={handleChanges} required />

        <label>Price*</label>
        <input type="text" name="cost" value={values.cost} onChange={handleChanges} required />

        <label>Bids Needed*</label>
        <input type="text" name="bidsNeeded" value={values.bidsNeeded} onChange={handleChanges} required />

        <label>Product Details*</label>
        <textarea name="about" value={values.about} onChange={handleChanges} required />

        <label>Image</label>
        <input type="file" name="image" onChange={handleChanges} />

        <button type="reset" onClick={() => setValues({ name: '', cost: '', bidsNeeded: '', about: '', image: null })}>Reset</button>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
