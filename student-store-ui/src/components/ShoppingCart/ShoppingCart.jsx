import React from 'react';
import './ShoppingCart.css';

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
      <div className='subdiv'>
        <h1>Shopping Cart</h1>{' '}
        <i className="material-icons md-48">add_shopping_cart</i>
      </div>
      {shoppingCart.length === 0 ? (
        <div className='emptycart'>
           Keep shopping!
        </div>
      ) : (
        <div>
          <CostTable shoppingCart={shoppingCart} />
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
    <div>
    <table className="costSummary">
        <thead>
        <tr className="header">
          <th className="center">Cost Breakdown</th>
          <th className="center">Total Cost</th>
        </tr>
      </thead>
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
    </div>
  );
};

function CostTable({ shoppingCart, shoppingCartPrice }) {
  return (
    <table className="CartTable">
      <thead>
        <tr className="header">
          <th className="flex-2">Item</th>
          <th className="center">Quantity</th>
          <th className="center">Price</th>
          <th className="center">Total</th>
        </tr>
      </thead>
      <tbody>
        {shoppingCart.map((item, i) => {
          return (
            <tr key={i}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>${item.price}</td>
              <td>
                ${roundTo(item.price * item.quantity)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
