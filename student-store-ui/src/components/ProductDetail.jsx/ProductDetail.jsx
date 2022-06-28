import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductView from '../ProductView/ProductView';

import './ProductDetail.css';

function ProductDetail ({
  handleAddItemToCart,
  handleRemoveItemFromCart,
  shoppingCart,
  APIURL,
}){

  const [currentProduct, setCurrentProduct] = useState({});
  const [error, setError] = useState(false);
  let { productId } = useParams();

  useEffect(async () => {
    try {
      const currentProd = await axios.get(APIURL + "/store/ " + productId);
      setCurrentProduct(currentProd.data.product);
      setError(false);
    } catch (e) {
      setError(true);
      console.log(e);
    }
  }, []);

  return (
    <div>
      {error ? (
        <h1 style={{ textAlign: 'center' }}>product doesn't exist bro</h1>
      ) : (
        <ProductView
          product={currentProduct}
          shoppingCart={shoppingCart}
          handleAddItemToCart={handleAddItemToCart}
          handleRemoveItemFromCart={handleRemoveItemFromCart}
        />
      )}
    </div>
  );
};

export default ProductDetail;
