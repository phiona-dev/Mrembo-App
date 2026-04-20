import React from 'react'
import "./Card.css"
import defaultImg from "../assets/default.jpg"

const Card = ({ title, brand, category, onClick }) => {
  return (
    <div className='product-card' onClick={onClick}>
      <div>
        <img src={defaultImg} alt={title} className='product-img' />
      </div>
      <div className='product-content' >
        <h2 className='product-title'>{title}</h2>
        <h4 className='product-brand'>{brand || "Unkown brand"}</h4>
        <p className='product-category'>{category || "Uncategorized"}</p>
      </div>
    </div>
  )
}

export default Card