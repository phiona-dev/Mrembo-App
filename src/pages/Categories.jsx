import React, { useEffect, useState } from 'react';
import "./Categories.css";
import axios from 'axios';
import Card from '../components/Card';
import { useNavigate } from 'react-router'


const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    //const [productDetails, setProductDetails] = useState([]);
    const [categoriesLoading, setCategoriesLoading] = useState(true);
    const [productsLoading, setProductsLoading] = useState(false);
    //const [productDetailsLoading, setProductDetailsLoading] = useState(false);
    const [categoriesError, setCategoriesError] = useState(null);
    const [productsError, setProductsError] = useState(null);
    //const [productDetailsError, setProductDetailsError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    //const [selectedProduct, setSelectedProduct] = useState(null);

    const navigate = useNavigate();

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

    const handleCategoryClick = async (id) => {
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

    const handleProductClick = async (product) => {
        navigate(`/products/${product._id}`)
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
                    <div className={`category-card ${selectedCategory === item._id ? "active" : ""}`} key={item._id} onClick={() =>handleCategoryClick(item._id)}>
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
                            <Card  
                                key={product._id}   
                                title={product.productName}
                                brand={product.brand}
                                category={product.categoryId?.categoryName}
                                onClick={() => handleProductClick(product)}
                                />
                        ))}
                    </div> 
                )}
            
            </section>
        )}
    </div>
  )
}

export default Categories