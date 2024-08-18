import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductForm = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const validateInputs = () => {
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

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationError = validateInputs();
        if (validationError) {
            setError(validationError);
            return;
        }
    
        setLoading(true);
        setError('');
    
        try {
            const response = await axios.post('http://localhost:5000/products/', 
                { name, description, price, quantity }, 
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                }
            );
            console.log(response.data);
            navigate('/products');
        } catch (error) {
            console.error('Error adding the product:', error);
            // Handle errors from the server
            if (error.response) {
                setError(error.response.data.message || 'An error occurred. Please try again.');
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Add Product</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <label htmlFor="name">Product Name</label>
                    <input 
                        type="text" 
                        id="name" 
                        className="form-control" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        placeholder="Product Name" 
                        required 
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="description">Description</label>
                    <input 
                        type="text" 
                        id="description" 
                        className="form-control" 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                        placeholder="Description" 
                        required 
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="price">Price</label>
                    <input 
                        type="number" 
                        id="price" 
                        className="form-control" 
                        value={price} 
                        onChange={(e) => setPrice(e.target.value)} 
                        placeholder="Price" 
                        required 
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="quantity">Quantity</label>
                    <input 
                        type="number" 
                        id="quantity" 
                        className="form-control" 
                        value={quantity} 
                        onChange={(e) => setQuantity(e.target.value)} 
                        placeholder="Quantity" 
                        required 
                    />
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Adding...' : 'Add Product'}
                </button>
                {error && <div className="alert alert-danger mt-3">{error}</div>}
            </form>
        </div>
    );
};

export default ProductForm;