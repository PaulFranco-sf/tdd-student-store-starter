import * as React from "react"
import ProductCard from "../ProductCard/ProductCard"
import "./Home.css"

export default function Home({ products }) {
  return (
    <div className="home">
      <p>Home</p>
      <p>Products</p>
      <ProductCard products={products} />
    </div>
  )
}
