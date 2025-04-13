import React, { useState } from 'react';

export function ListingItemInfo() {
  const userName = localStorage.getItem('userName');

  const [values, setValues] = useState({
    name: '',
    cost: '',
    bids: 0,
    bidsNeeded: '',
    about: '',
    image: null,
    seller: userName
  });

  const handleChanges = (e) => {
    const { name, type, value, files } = e.target;
    setValues({
      ...values,
      [name]: type === "file" ? URL.createObjectURL(files[0]) : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/api/listings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });
    alert("Item listed!");
    setValues({ name: '', cost: '', bids: 0, bidsNeeded: '', about: '', image: null, seller: userName });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>List Item</h1>
      <input type="text" name="name" value={values.name} onChange={handleChanges} placeholder="Product Name" required />
      
    </form>
  );
}