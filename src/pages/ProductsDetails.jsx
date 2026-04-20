import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams, useNavigate } from 'react-router'

const ProductsDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchProduct = async () => {
           try{
                const response = await axios.get(`http://localhost:3000/products/${id}`, {
                    headers: { Authorization: token ? `Bearer ${token}` : ""}
                });
                
                const result = response.data;
                setProduct(result);
           } catch(err){
            setError(err.response?.data?.message || err.message);
           } finally {
            setLoading(false);
           }
        }
        fetchProduct();

    }, [id, token])

    if (loading) return <p>Loading product...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!product) return <p>Product not found.</p>;

  return (
    <div className='product-details'>
      <button onClick={() => navigate(-1)}>Back</button>
        <h3>{product.productName}</h3> 
        <p>{product.brand || "Unknown brand"}</p>
        <p>{product.categoryId?.categoryName}</p>
        <h4>Ingredients:</h4> 

        {product.ingredientList.length === 0 ? ( <p>No ingredients available.</p>) : (
          <ul>
            {product.ingredientList.map((ingredient, index) => {
                <li key={index}>{ingredient}</li>
            })}
          </ul>
        ) } 
    </div>
  )
}

export default ProductsDetails