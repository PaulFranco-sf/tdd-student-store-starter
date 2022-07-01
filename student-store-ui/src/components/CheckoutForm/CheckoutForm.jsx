import React, { useState } from 'react';
import './CheckoutForm.css';
import axios from 'axios';

function CheckoutForm ({
  checkoutForm,
  handleOnCheckoutFormChange,
  shoppingCart,
  shoppingCartPrice,
  handleOnSubmitCheckoutForm,
  roundTo,
}) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [load, setLoad] = useState(false)
  const [hide, setHide] = useState(false)
  const APIURL = 'http://localhost:3001';

async function sendOrder() {
    try {
      const response = await axios.post(APIURL + "/purchase", {
        "purchase" : {
          "shoppingCart": shoppingCart,
          "name": name,
          "email": email,
          "orderTotal": shoppingCartPrice,
        }
      });
      console.log(response)
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="checkout">
      <h1>Checkout Info</h1>
      <input
        className='inputbox'
        name="name"
        value={checkoutForm.name}
        type="text"
        placeholder="ENTER YOUR NAME"
        hidden={hide}
        onChange={(e) => {
          handleOnCheckoutFormChange(e.target.value, checkoutForm.email);
          setName(e.target.value)
        }}
      />
      <input
        className='inputbox'
        name="email"
        value={checkoutForm.email}
        type="email"
        hidden={hide}
        placeholder="ENTER YOUR EMAIL"
        onChange={(e) => {
          setEmail(e.target.value)
          handleOnCheckoutFormChange(checkoutForm.name, e.target.value);
        }}
      />
      <button className="checkoutbtn" hidden={hide} onClick={() => {handleOnSubmitCheckoutForm(); setLoad(true); setHide(true); sendOrder(); }}>Checkout</button>
      <Receipt roundTo={roundTo} load={load} shoppingCart={shoppingCart} shoppingCartPrice={shoppingCartPrice} name={name}/>
    </div>
  );
};

export default CheckoutForm;

function Receipt({load, shoppingCart, shoppingCartPrice, name, roundTo }){  
  console.log(load)
  console.log(shoppingCart)
  console.log(shoppingCartPrice)
  if (load == true){
  return (
    <div className='receipt'>
      <p> Showing receipt for <b>{name}</b></p>
      {shoppingCart.map((item, i) => {
          return (
            <p>
            <ul>
              <li>{item.quantity} {item.name} purchased at a cost of ${roundTo(item.price)} for a total of ${roundTo(item.price * item.quantity)}</li>
            </ul>
            </p>
          );
        })}
        <p>Before taxes, the subtotal was ${roundTo(shoppingCartPrice)}. <br></br> After taxes and fees were applied, the total comes out to ${roundTo(shoppingCartPrice + (shoppingCartPrice * .80))}</p>
    </div>
  )
      }
  else{return null}
}