import * as React from 'react';
import CheckoutForm from './CheckoutForm/CheckoutForm';
import ShoppingCart from './ShoppingCart/ShoppingCart';
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
  return (
    <section className="sidebar">
      <div className="sidenav" style={{ width: isOpen ? '600px' : 0 }}>
        <div className="closebtn" onClick={handleOnToggle}>
          &times;
        </div>
        <ShoppingCart shoppingCart={shoppingCart} shoppingCartPrice={shoppingCartPrice} />
        <CheckoutForm
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
