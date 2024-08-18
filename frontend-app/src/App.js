import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './components/Auth/Login.js';
import Register from './components/Auth/register';
import ProductList from './components/Products/ProductList';
import ProductForm from './components/Products/ProductForm';
import ProductDetails from './components/Products/ProductDetails';
import UpdateProduct from './components/Products/UpdateProduct';
import DeleteProduct from './components/Products/DeleteProduct';
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
