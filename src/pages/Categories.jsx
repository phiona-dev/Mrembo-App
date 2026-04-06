import React, { useEffect, useState } from 'react';
import "./Categories.css";
import axios from 'axios';


const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [categoriesLoading, setCategoriesLoading] = useState(true);
    const [productsLoading, setProductsLoading] = useState(false);
    const [categoriesError, setCategoriesError] = useState(null);
    const [productsError, setProductsError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchCategories = async () => {
           try{
                const response = await axios.get("http://localhost:3000/categories", {
                    headers: { Authorization: token ? `Bearer ${token}` : ""}
                });
                
                const result = response.data;
                setCategories(result);
           } catch(err){
            setCategoriesError(err.response?.data?.message || err.message);
           } finally {
            setCategoriesLoading(false);
           }
        }
        fetchCategories();

    }, [token])

    const handleClick = async (id) => {
        try {
            if (selectedCategory === id){
                setSelectedCategory(null); //deselect if same card
                setProducts([]); //clear products
                return
            }
            setSelectedCategory(id); //select a new card
            setProducts([]);
            setProductsLoading(true);
            setProductsError(null);

            const response = await axios.get(`http://localhost:3000/products?categoryId=${id}`, {
                headers: { Authorization: token ? `Bearer ${token}` : ""}
            })
            setProducts(response.data);
        } catch(err){
            setProductsError(err.response?.data?.message || err.message);
        } finally {
            setProductsLoading(false);
        }
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
            {categoriesLoading && <p>Loading categories...</p>}
            {categoriesError && <p>Error: {categoriesError} </p>}
            {!categoriesLoading && !categoriesError && categories.length === 0 && (
                <p>No categories available.</p>
            )}
            {!categoriesLoading && !categoriesError && categories.length > 0 && (
                <div className='categories-grid'>
                {categories.map((item) => (
                    <div className={`card ${selectedCategory === item._id ? "active" : ""}`} key={item._id} onClick={() =>handleClick(item._id)}>
                        <h2 className='card-title'>{item.categoryName}</h2>
                    </div>
                ))}
                </div>
            )}
        </section>

        {selectedCategory && (
            <section className='products-body'>
                <h3>
                    Products for {categories.find(c => c._id === selectedCategory)?.categoryName}
                </h3>
                {productsLoading && <p>Loading products...</p>}
                {productsError && <p>Error: {productsError}</p>}
                {!productsLoading && !productsError && products.length === 0 && (<p>No products found.</p>)}
                {!productsLoading && !productsError && products.length > 0 && (
                <div className='products-grid'>
                        {products.map((product) => (
                            <div className='product-card' key={product._id}>
                                <h4>{product.productName}</h4>
                                <p>{product.brand}</p>
                            </div>
                        ))}
                    </div> 
                )}
            
            </section>
        )}
    </div>
  )
}

export default Categories