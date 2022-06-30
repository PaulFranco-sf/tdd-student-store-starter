import * as React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import { useState, useEffect } from 'react';

// Components
import ProductDetail from '../ProductDetail.jsx/ProductDetail';
import NotFound from '../NotFound/NotFound';
import Hero from '../Hero/Hero';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import Home from '../Home/Home';

export default function App() {
  const APIURL = 'http://localhost:3001';
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState('All Categories');
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [shoppingCart, setShoppingCart] = useState([]);
  const [shoppingCartPrice, setShoppingCartPrice] = useState(0);
  const [checkoutForm, setCheckoutForm] = useState({name: '', email: '', });

  function scrollToAbout(){
    const aboutDiv = document.getElementById('About')
    aboutDiv.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  function scrollToContact(){
    const contactDiv = document.getElementById('Contact')
    contactDiv.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  function scrolltoFooter(){
    const footerDiv = document.getElementById('Footer')
    footerDiv.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }


  useEffect(async () => {
    try {
      const response = await axios.get(APIURL + "/store");

      if (response.status != 200) {
        setError(response.text); 
        return error
      }
      setProducts(response.data.products);
    } catch (e) {
      console.log(e);
    }
  }, []);


  function handleOnToggle() {
    setIsOpen(!isOpen);
  }

  function handleAddItemToCart(productId, price, name) {
    setShoppingCartPrice(shoppingCartPrice + price);
    console.log(shoppingCartPrice)
    for (const i in shoppingCart) {
      if (shoppingCart[i].productId == productId) {
        shoppingCart[i].quantity++;
        setShoppingCart([...shoppingCart]);
        console.log(shoppingCart)
        return;
      }
    }
    setShoppingCart([...shoppingCart, { productId, quantity: 1, price, name }]);
    console.log(shoppingCartPrice)
  };

  function handleRemoveItemFromCart(productId, price) {
    console.log(shoppingCartPrice)
    for (const i in shoppingCart) {
      if (shoppingCart[i].productId == productId) {
        if (shoppingCart[i].quantity == 1) {
          shoppingCart.splice(i, 1);
        } else {
          shoppingCart[i].quantity--;
        }
        setShoppingCartPrice(shoppingCartPrice - price);
        setShoppingCart([...shoppingCart]);
        return; 
      }
    }
  };

  function handleOnSubmitCheckoutForm() {
    setCheckoutForm({ name: '', email: '' });
  };

  function handleOnCheckoutFormChange(name, email) {
    setCheckoutForm({ name, email });
  };

  console.log(APIURL)
  return (
    <div className="app">
      <main>
        <BrowserRouter>
          <Navbar 
            scrollFooter={scrolltoFooter}
            scrollContact={scrollToContact}
            scrollAbout={scrollToAbout}
            />
          <Hero />
          {/* <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            /> */}
          <Categories
          setFilter={setFilter}
          filter={filter}
          />

          <Sidebar
            shoppingCartPrice={shoppingCartPrice}
            checkoutForm={checkoutForm}
            handleOnCheckoutFormChange={handleOnCheckoutFormChange}
            handleOnSubmitCheckoutForm={handleOnSubmitCheckoutForm}
            handleOnToggle={handleOnToggle}
            isOpen={isOpen}
            shoppingCart={shoppingCart}
            products={products}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  shoppingCartPrice={shoppingCartPrice}
                  handleAddItemToCart={handleAddItemToCart}
                  handleRemoveItemFromCart={handleRemoveItemFromCart}
                  shoppingCart={shoppingCart}
                  filter={filter}
                  setFilter={setFilter}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  products={products}
                />
              }
            />
            <Route
              path="/products/:productId"
              element={
                <ProductDetail
                  handleRemoveItemFromCart={handleRemoveItemFromCart}
                  shoppingCart={shoppingCart}
                  handleAddItemToCart={handleAddItemToCart}
                  APIURL={APIURL}
                />
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </main>
    </div>
  );
}

function Categories({ filter, setFilter }) {
  const categories = ['All Categories',  'Accessories', 'Food', 'Tech'];
  return (
    <div className="categories">
      {categories.map((item, i) => {
        return (
          <button
            key={i} className="categorybtn"
            onClick={() => setFilter(item)}>
            {item}
          </button>
        );
      })}
    </div>
  );
};

// function SearchBar ({ searchQuery, setSearchQuery }) {
//   return (
//     <div className="searchbar-container">
//       <input className='searchbar'
//         placeholder="Search for Any Item!"
//         value={searchQuery}
//         onChange={(e) => {
//           setSearchQuery(e.target.value);
//         }}
//       />
//     </div>
//   );
// };
