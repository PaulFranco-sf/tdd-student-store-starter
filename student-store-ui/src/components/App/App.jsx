import * as React from "react"
import { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar"
import Sidebar from "../Sidebar/Sidebar"
import Home from "../Home/Home"
import "./App.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"


export default function App() {
  const [products, addProducts] = useState();
  const [isFetching, setFetching] = useState(false);
  const [error, setError] = useState("Unable to fetch data");

  useEffect(() => {
    fetch('https://codepath-store-api.herokuapp.com/store')
      .then(setFetching(true))
      .then(results => results.json())
      .then(data => addProducts(data))
      .then(setFetching(false))
  }, [])
  console.log(products)
  //console.log(error)
  //console.log(Object.keys(error))
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home products={products}/>}>
            </Route>
        </Routes>
        <main>
        </main>
      </BrowserRouter>
    </div>
  )
}
