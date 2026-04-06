import React, { useEffect, useState } from 'react';
import "./Categories.css";
import axios from 'axios';


const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
           try{
                const token = localStorage.getItem("token");
                const response = await axios.get("http://localhost:3000/categories", {
                    headers: { Authorization: token ? `Bearer ${token}` : ""}
                });
                
                const result = response.data;
                setCategories(result);
           } catch(err){
            setError(err.response?.data?.message || err.message);
           } finally {
            setLoading(false);
           }
        }
        fetchData();

    }, [])

    const handleClick = (id) => {
        if (selectedCategory === id){
            setSelectedCategory(null); //deselect if same card
        } else {
            setSelectedCategory(id); //select a new card
        }

        alert("Card Clicked")
    }

  return (
    <div>
        <section className='header'>
            <h2 className='title'>Categories</h2>
            <p className='subtitle'>Explore skincare product types</p>
            <div className='search'>
                <input type='text' placeholder='Search categories'/>
                <button type='submit'>Search</button>
            </div>
        </section>
        <section className='categories-body'>
            {loading && <p>Loading categories...</p>}
            {error && <p>Error: {error} </p>}
            {!loading && !error && categories.length === 0 && (
                <p>No categories available.</p>
            )}
            {!loading && !error && categories.length > 0 && (
                <div className='categories-grid'>
                {categories.map((item) => (
                    <div className={`card ${selectedCategory === item._id ? "active" : ""}`} key={item._id} onClick={() =>handleClick(item._id)}>
                        <h2 className='card-title'>{item.categoryName}</h2>
                    </div>
                ))}
                </div>
            )}
        </section>
    </div>
  )
}

export default Categories