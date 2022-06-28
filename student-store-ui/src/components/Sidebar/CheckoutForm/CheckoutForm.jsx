import React, { useState } from 'react';
import './CheckoutForm.css';

function CheckoutForm ({
  checkoutForm,
  handleOnCheckoutFormChange,
  shoppingCart,
  shoppingCartPrice,
  handleOnSubmitCheckoutForm,
}) {
  const [userName, setUserName] = useState("")
  const [load, setLoad] = useState(false)
  const [hide, setHide] = useState(false)
  return (
    <div className="checkout">
      <h1>Checkout Info</h1>
      <input
        name="name"
        value={checkoutForm.name}
        type="text"
        placeholder="ENTER YOUR NAME"
        hidden={hide}
        onChange={(e) => {
          handleOnCheckoutFormChange(e.target.value, checkoutForm.email);
          setUserName(e.target.value)
        }}
      />
      <input
        name="email"
        value={checkoutForm.email}
        type="email"
        hidden={hide}
        placeholder="ENTER YOUR EMAIL"
        onChange={(e) => {
          handleOnCheckoutFormChange(checkoutForm.name, e.target.value);
        }}
      />
      <button className="checkoutbtn" hidden={hide} onClick={() => {handleOnSubmitCheckoutForm(); setLoad(true); setHide(true) }}>Checkout</button>
      <Receipt load={load} shoppingCart={shoppingCart} shoppingCartPrice={shoppingCartPrice} userName={userName}/>
    </div>
  );
};

export default CheckoutForm;

function Receipt({load, shoppingCart, shoppingCartPrice, userName}){  
  console.log(load)
  console.log(shoppingCart)
  console.log(shoppingCartPrice)
  if (load == true){
  return (
    <div className='receipt'>
      <p> Showing receipt for <b>{userName}</b></p>
      {shoppingCart.map((item, i) => {
          return (
            <p>
            <ul>
              <li>{item.quantity} {item.name} purchased at a cost of ${item.price} for a total of ${item.price * item.quantity}</li>
            </ul>
            </p>
          );
        })}
        <p>Before taxes, the subtotal was ${shoppingCartPrice}. <br></br> After taxes and fees were applied, the total comes out to ${shoppingCartPrice + (shoppingCartPrice * .80)}</p>
    </div>
  )
      }
  else{return null}
}