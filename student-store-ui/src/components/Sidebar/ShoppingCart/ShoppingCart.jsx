import React, { useEffect } from 'react';

function roundTo(n, digits) {
  var negative = false;
  if (digits === undefined) {
      digits = 0;
  }
  if (n < 0) {
      negative = true;
      n = n * -1;
  }
  var multiplicator = Math.pow(10, digits);
  n = parseFloat((n * multiplicator).toFixed(11));
  n = (Math.round(n) / multiplicator).toFixed(digits);
  if (negative) {
      n = (n * -1).toFixed(digits);
  }
  return n;
}

function ShoppingCart ({ shoppingCart, shoppingCartPrice }) {
  return (
    <div className="shopping-cart">
      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <h1>Shopping Cart</h1>{' '}
        <i className="material-icons md-48">add_shopping_cart</i>
      </div>
      {shoppingCart.length === 0 ? (
        <div style={{ fontSize: '1rem', margin: 20 }}>
           Keep shopping!
        </div>
      ) : (
        <div>
          <Table shoppingCart={shoppingCart} />
          <CostSummary shoppingCart={shoppingCart} shoppingCartPrice={shoppingCartPrice}/>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;


function CostSummary ({ shoppingCart, shoppingCartPrice }) {
  console.log(shoppingCartPrice)
  return (
    <table className="summary-container">
      <tr className="summary-row">
        <td>Subtotal</td>
        <td>${roundTo(shoppingCartPrice)}</td>
      </tr>
      <tr className="summary-row">
        <td>Taxes and Fees</td>
        <td>${roundTo(shoppingCartPrice * 0.875)}</td>
      </tr>
      <tr className="summary-row">
        <td>Total</td>
        <td>${roundTo(shoppingCartPrice + shoppingCartPrice * 0.875)}</td>
      </tr>
    </table>
  );
};

function Table({ shoppingCart, shoppingCartPrice }) {
  return (
    <table className="CartTable">
      <thead>
        <tr className="header">
          <th className="flex-2">Name</th>
          <th className="center">Quantity</th>
          <th className="center">Unit Price</th>
          <th className="center">Cost</th>
        </tr>
      </thead>
      <tbody>
        {shoppingCart.map((item, i) => {
          return (
            <tr className="product-row" key={i}>
              <td className="flex-2 cart-product-name">{item.name}</td>
              <td className="center cart-product-quantity">{item.quantity}</td>
              <td className="center cart-product-price">${item.price}</td>
              <td className="center cart-product-subtotal">
                ${roundTo(item.price * item.quantity)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
