import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './components/Auth/Login.js';
import Register from './components/Auth/register.js';
import ProductList from './components/Products/ProductList.js';
import ProductForm from './components/Products/ProductForm.js';
import ProductDetails from './components/Products/ProductDetails.js';
import UpdateProduct from './components/Products/UpdateProduct.js';
import DeleteProduct from './components/Products/DeleteProduct.js';
import LandingPage from './components/landing.js';

import 'bootstrap/dist/css/bootstrap.min.css';
const App = () => {
    return (
        <Router>
            <Routes>
            <Route path="/" element={<LandingPage />} />  {/* Default route */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/products" element={<ProductList />} />
                <Route path="/add-product"  element={<ProductForm />} />
                <Route path="/products/:id" element={<ProductDetails/>} />
                <Route path="/products/:id/update" element={<UpdateProduct/>} />
                <Route path="/products/:id/delete" element={<DeleteProduct/>} />

            </Routes>
        </Router>
    );
};

export default App;
