import * as React from 'react';
import CheckoutForm from '../CheckoutForm/CheckoutForm';
import ShoppingCart from '../ShoppingCart/ShoppingCart';
import './Sidebar.css';

export default function Sidebar({
  handleOnToggle,
  isOpen,
  shoppingCart,
  products,
  shoppingCartPrice,
  checkoutForm,
  handleOnCheckoutFormChange,
  handleOnSubmitCheckoutForm,
}) {

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
  return (
    <section className="sidebar">
      <div className="sidenav" style={{ width: isOpen ? '600px' : 0 }}>
        <div className="closebtn" onClick={handleOnToggle}>
          &times;
        </div>
        <ShoppingCart roundTo={roundTo} shoppingCart={shoppingCart} shoppingCartPrice={shoppingCartPrice} />
        <CheckoutForm
          roundTo={roundTo}
          checkoutForm={checkoutForm}
          handleOnCheckoutFormChange={handleOnCheckoutFormChange}
          handleOnSubmitCheckoutForm={handleOnSubmitCheckoutForm}
          shoppingCartPrice={shoppingCartPrice}
          shoppingCart={shoppingCart}
        />
      </div>

      <div className="sidebar-closed">
        <i
          id="open-icon"
          className="material-icons md-48 toggle-button"
          onClick={handleOnToggle}>
          arrow_forward
        </i>
      </div>
      <div
        id="blur"
        style={{ display: isOpen ? 'block' : 'none' }}
        onClick={handleOnToggle}></div>
    </section>
  );
}
