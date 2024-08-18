import React from 'react';
import { Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();

    const handleRegisterClick = () => {
        navigate('/register');
    };

    const handleLoginClick = () => {
        navigate('/login');
    };
    const handleProductsClick = () => {
        navigate('/Products');
    };

    return (
        <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', textAlign: 'center' }}>
            <h2>Welcome to the Product System mangment</h2>
            <p>Please choose an option:</p>
            <Button
                color="primary"
                onClick={handleRegisterClick}
                style={{ width: '100%', marginBottom: '10px' }}
            >
                Register
            </Button>
            <Button
                color="secondary"
                onClick={handleLoginClick}
                style={{ width: '100%' , marginBottom: '10px'}}
            >
                Login
            </Button>

            <Button
                color="info"
                onClick={handleProductsClick}
                style={{ width: '100%'  }}
            >
                ProductsList
            </Button>
        </div>
    );
};

export default LandingPage;
