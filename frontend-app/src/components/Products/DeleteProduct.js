// src/components/DeleteProduct.js
import React from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
const DeleteProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/products/${id}`,{
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            navigate('/products'); // Redirect to product list or another page
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Are you sure you want to delete this product?</h2>
            <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
        </div>
    );
};

export default DeleteProduct;
