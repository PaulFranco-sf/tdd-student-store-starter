import React from 'react';
import ProductCard from '../ProductCard/ProductCard';

function ProductView ({
  handleRemoveItemFromCart,
  shoppingCart,
  product,
  handleAddItemToCart,
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
      <h1>{product.name}</h1>
      <ProductCard
        product={product}
        handleAddItemToCart={handleAddItemToCart}
        handleRemoveItemFromCart={handleRemoveItemFromCart}
        shoppingCart={shoppingCart}
        showDescription={true}
      />
    </div>
  );
};

export default ProductView;
