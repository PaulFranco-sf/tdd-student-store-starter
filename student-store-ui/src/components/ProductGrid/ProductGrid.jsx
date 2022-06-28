import React, { useState, useEffect } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import './ProductGrid.css';

function ProductGrid({
  products,
  handleAddItemToCart,
  handleRemoveItemFromCart,
  shoppingCart,
  shoppingCartPrice,
  filter,
  searchQuery,
}) {
  const [showDescription, setShowDescription] = useState();
  let productFilter;
  if (filter == 'All Categories') {
    if (searchQuery == '') {
      productFilter = products;
    } else {
      productFilter = products.filter((item) => {
        return item.name.toLowerCase().includes(searchQuery.toLowerCase());
      });
    }
  } else {
    productFilter = products.filter((item) => {
      return (
        item.category == filter.toLowerCase() &&
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }

  return (
    <div style={{ margin: '30px 50px 30px 120px' }}>
      <h1>Current Products</h1>
      <div className="product-grid">
        {productFilter.map((product) => {
          return (
            <ProductCard
              key={product.id}
              product={product}
              shoppingCartPrice={shoppingCartPrice}
              handleAddItemToCart={handleAddItemToCart}
              handleRemoveItemFromCart={handleRemoveItemFromCart}
              showDescription={showDescription}
              setShowDescription={setShowDescription}
              shoppingCart={shoppingCart}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProductGrid;
