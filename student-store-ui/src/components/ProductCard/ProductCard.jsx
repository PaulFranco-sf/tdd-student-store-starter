import React from 'react'
import './ProductCard.css'

export default function ProductCard({ products }) {
    if (products){
      products.products.map((product, i) => (
        console.log(product)
        ))
    }
  return (
    <>
      {products ? (products.products.map((product, i) => (
        <div className='ProductCard' key={i}>
          <p className='product-name'>{product.name}</p>
          <p className='product-price'>{product.price}</p>
          <p className='product-description'>{product.description}</p>
          <img src={product.image} width="250px" height="250px"></img>
      </div>
      )) ) : (<></>)
    }
    </>
  )
}
