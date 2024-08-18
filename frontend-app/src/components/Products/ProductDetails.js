import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Card, Button, Alert, Row, Col } from 'reactstrap';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:5000/products/${id}`);
                setProduct(response.data);
                setError(null);  // Reset error state on successful fetch
            } catch (error) {
                setProduct(null);  // Reset product state on error
                setError('Error fetching product details.');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) return <Container className="mt-4"><p>Loading...</p></Container>;
    if (error) return <Container className="mt-4"><Alert color="danger">{error}</Alert></Container>;

    return (
        <Container className="mt-4">
            {product ? (
                <Card>
                    <div className="card-header">
                        <h4 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#333' }}>
                            {product.name}
                        </h4>
                    </div>
                    <div className="card-body">
                        <Row>
                            <Col md={6}>
                                <p style={{ fontSize: '1.2rem' }}>
                                    <strong>Description:</strong> {product.description}
                                </p>
                                <p><strong>Created At:</strong> {new Date(product.created_at).toLocaleDateString()}</p>
                                <p><strong>Updated At:</strong> {new Date(product.updated_at).toLocaleDateString()}</p>
                            </Col>
                            <Col md={6} className="d-flex flex-column align-items-start">
                                <p><strong>Price:</strong> ${product.price}</p>
                                <Button color="primary" href={`/products/${id}/update`} className="mb-2">Update Product</Button>
                                <Button color="danger" href={`/products/${id}/delete`}>Delete Product</Button>
                            </Col>
                        </Row>
                    </div>
                </Card>
            ) : (
                <Alert color="info">No product details available.</Alert>
            )}
        </Container>
    );
};

export default ProductDetails;
