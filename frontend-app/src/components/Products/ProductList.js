import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Table, Alert, Spinner } from 'reactstrap';
const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
});

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate(); // Initialize useNavigate hook
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axiosInstance.get('/products/');
                setProducts(response.data);
                setLoading(false);
            } catch (error) {
                setError(error.message || 'Error fetching products');
                setLoading(false);
                console.error('Error fetching products:', error.response ? error.response.data : error.message);                
            }
            finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleRowClick = (id) => {
        navigate(`/products/${id}`); // Redirect to product details page
    };

    const handleAddProductClick = () => {
        navigate('/add-product'); // Navigate to the Add Product page
    };

    if (loading) return (
        <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <Spinner animation="border" variant="primary" data-testid="loading-spinner" />
        </Container>
    );
    
    if (error) return <div>Error fetching products</div>;
    return (
        <Container className="mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Product List</h2>
                <Button 
                    variant="primary" 
                    onClick={handleAddProductClick}
                >
                    Add Product
                </Button>
            </div>
            {error && (
                <Alert variant="danger">
                    Error fetching products: {error}
                </Alert>
            )}
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>CreatedAt</th>
                        <th>UpdatedAt</th>


                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr 
                            key={product.id} 
                            onClick={() => handleRowClick(product.id)} 
                            style={{ cursor: 'pointer' }}
                        >
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>${product.price}</td>
                            <td>{product.quantity}</td>
                            <td>{product.created_at}</td>
                            <td>{product.updated_at}</td>

                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default ProductList;
