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
      <Receipt email={email} roundTo={roundTo} load={load} shoppingCart={shoppingCart} shoppingCartPrice={shoppingCartPrice} name={name}/>
    </div>
  );
};

export default CheckoutForm;

function Receipt({load, shoppingCart, shoppingCartPrice, name, roundTo, email }){  
  if (load == true){
  return (
    <div className='receipt'>
      <p><b> Showing receipt for {name}</b></p>
      {shoppingCart.map((item, i) => {
          return (
            <p>
            <ul>
              <li><b>{item.quantity} {item.name} purchased at a cost of ${roundTo(item.price)} for a total of ${roundTo(item.price * item.quantity)}</b></li>
            </ul>
            </p>
          );
        })}
        <p><b>Before taxes, the subtotal was ${roundTo(shoppingCartPrice)}.</b> <br></br><b>After taxes and fees were applied, the total comes out to ${roundTo(shoppingCartPrice + (shoppingCartPrice * .80))}</b> </p><br></br>
        <p><b>Email receipt has been sent to {email} </b></p>
    </div>
  )
      }
  else {return null}
}