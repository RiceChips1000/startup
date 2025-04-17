import React from 'react';
import { ListingItemInfo } from './item_object';
import 'bootstrap/dist/css/bootstrap.min.css';

export function Sell_Items({ setLatestListing }) {
  return (
    <>
      <h1 className="specific-page-title">Your Listings</h1>
      <main>
        <ListingItemInfo setLatestListing={setLatestListing} />
      </main>
    </>
  );
}