import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Spinner, Input, Form, FormGroup, Label } from 'reactstrap';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const validateRegistration = () => {
        if (!username || username.length < 3) {
            return 'Username must be at least 3 characters long.';
        }

        if (!password || password.length < 6) {
            return 'Password must be at least 6 characters long.';
        }
        return null; // No errors
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const validationError = validateRegistration();
        if (validationError) {
            setError(validationError);
            return;
        }
        setLoading(true);
        setError('');

        try {
            await axios.post('http://localhost:5000/auth/register', { username, password });
            navigate('/login');
        } catch (error) {
            console.error('Error registering:', error);
            if (error.response && error.response.data) {
                setError(error.response.data.msg || 'Registration failed. Please try again.');
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
            <h2>Register</h2>
            <Form onSubmit={handleRegister}>
                <FormGroup>
                    <Label for="username">Username</Label>
                    <Input
                        type="text"
                        name="username"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username"
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                    />
                </FormGroup>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Button
                        type="submit"
                        color="success"
                        disabled={loading}
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '4px',
                            cursor: loading ? 'not-allowed' : 'pointer',
                        }}
                    >
                        {loading ? <Spinner size="sm" /> : 'Register'}
                    </Button>
                </div>
                {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>} {/* Display error message */}
            </Form>
        </div>
    );
};

export default Register;
