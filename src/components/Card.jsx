import React from 'react'
import "./Card.css"
import defaultImg from "../assets/default.jpg"

const Card = ({ title, brand, category }) => {
  return (
    <div className='product-card'>
      <div>
        <img src={defaultImg} alt={title} className='product-img' />
      </div>
        <h2 className='product-title'>{title}</h2>
        <h4 className='product-brand'>{brand || "Unkown brand"}</h4>
        <p className='product-category'>{category || "Uncategorized"}</p>
        
    </div>
  )
}

export default Card