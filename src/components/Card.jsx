import React from 'react'
import "./Card.css"

const Card = ({ title, brand, category }) => {
  return (
    <div className='product-card'>
        <h2 className='product-title'>{title}</h2>
        <h4 className='product-brand'>{brand || "Unkown brand"}</h4>
        <p className='product-category'>{category || "Uncategorized"}</p>
        
    </div>
  )
}

export default Card