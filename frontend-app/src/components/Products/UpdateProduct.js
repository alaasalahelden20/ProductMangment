// src/components/UpdateProduct.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
const apiUrl = process.env.REACT_APP_API_URL;

const UpdateProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({ name: '', price: '', description: '',quantity: '' });
    const [error, setError] = useState(null);

    const validateProduct = () => {
        const { name, price, description, quantity } = product;
        
        if (!name || name.length < 3) {
            return 'Product name must be at least 3 characters long.';
        }
        if (!description || description.length < 10) {
            return 'Description must be at least 10 characters long.';
        }
        if (!price || price <= 0) {
            return 'Price must be a positive number.';
        }
        if (!quantity || quantity < 0) {
            return 'Quantity cannot be negative.';
        }
        return null; // No errors
    };

    

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${apiUrl}/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                setError('Error fetching product details.');
            }
        };

        fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const validationError = validateProduct();
        if (validationError) {
            setError(validationError);
            return;
        }
    
        try {
            const { name, price, description, quantity } = product;
            await axios.put(`${apiUrl}/products/${id}`, { name,description, price , quantity }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            navigate(`/products/${id}`);
        } catch (error) {
            console.error('Error:', error.response || error.message);
            setError('Error updating product.');
        }
    };

    return (
        <div className="container mt-4">
            <h2>Update Product</h2>
            {error && <p className="text-danger">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label" htmlFor="name">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="price">Price</label>
                    <input
                        type="number"
                        className="form-control"
                        id="price"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="description">Description</label>
                    <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="quantity">Quantity</label>
                    <input
                        type="number"
                        className="form-control"
                        id="quantity"
                        name="quantity"
                        value={product.quantity}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary" data-testid='Update_Product_button'>Update Product</button>
            </form>
        </div>
    );
};

export default UpdateProduct;
