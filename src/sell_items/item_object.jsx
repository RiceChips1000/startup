import React, { useState } from 'react';

export function ListingItemInfo() {
  const userName = localStorage.getItem('userName'); // Still used for identifying user
  const [values, setValues] = useState({
    name: '',
    cost: '',
    bids: 0,
    bidsNeeded: '',
    about: '',
    image: null,
    seller: userName,
  });

  const handleChanges = (e) => {
    const { name, value, files } = e.target;
    if (e.target.type === "file") {
      setValues({ ...values, [name]: files[0] });
    } else {
      setValues({ ...values, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const itemToSend = { ...values };

    if (values.image) {
      itemToSend.image = await convertToBase64(values.image);
    }

    const response = await fetch('/api/listings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(itemToSend),
    });

    if (response.ok) {
      alert("Item saved to server!");
      setValues({ name: '', cost: '', bids: 0, bidsNeeded: '', about: '', image: null });
    } else {
      alert("Failed to save item.");
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>List Item</h1>
      <input name="name" value={values.name} onChange={handleChanges} placeholder="Product Name*" required />
      <input name="cost" value={values.cost} onChange={handleChanges} placeholder="Price*" required />
      <input name="bidsNeeded" value={values.bidsNeeded} onChange={handleChanges} placeholder="Bids Needed*" required />
      <textarea name="about" value={values.about} onChange={handleChanges} placeholder="Product Details*" required />
      <input type="file" name="image" onChange={handleChanges} />
      <button type="submit">Submit</button>
    </form>
  );
}
