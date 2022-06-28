import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

function ProductCard ({
  product,
  handleAddItemToCart,
  handleRemoveItemFromCart,
  showDescription,
  setShowDescription,
  shoppingCartPrice,
  shoppingCart,
}){
  return (
    <div
      className="product-card"
      style={{
        height: showDescription ? '400px' : '350px',
        width: showDescription ? '500px' : '350px',
      }}>
      <div className="image-container">
        <Link to={`/products/${product.id}`}>
          <img className="product-image" src={product.image} />
        </Link>
      </div>
      <div className="product-info">
        <div className="main-info">
          <div className="product-name"><b>{product.name}</b></div>
          <div className="product-price"><b>${product.price}</b></div>
        </div>
        <div className="actions">
          <div className="buttons">
            <button
              className="add"
              onClick={() => {
                handleAddItemToCart(product.id, product.price, product.name);
              }}>
              <i className="material-icons">add</i>
            </button>
            <button
              className="remove"
              onClick={() => {
                handleRemoveItemFromCart(product.id, product.price);
              }}>
              <i className="material-icons">remove</i>
            </button>
          </div>

          {shoppingCart.find((item) => item.productId == product.id) && (
            <span className="added-items">
              {
                shoppingCart.find((item) => item.productId == product.id)
                  .quantity
              }
            </span>
          )}
        </div>
      </div>
      <div className="desc">
        {showDescription && (
          <div className="description">{product.description}</div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
