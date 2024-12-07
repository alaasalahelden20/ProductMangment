import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProductForm from '../ProductForm'; 
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
jest.mock('axios');

describe('ProductForm Component', () => {
    test('renders the form with all fields', () => {
        render(
            <Router>
                <ProductForm />
            </Router>
        );

        expect(screen.getByLabelText(/product name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/price/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/quantity/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /add product/i })).toBeInTheDocument();
    });

    test('shows an error when submitting with invalid inputs', async () => {
        render(
            <Router>
                <ProductForm />
            </Router>
        );

        fireEvent.change(screen.getByLabelText(/price/i), { target: { value: '-10' } });
        fireEvent.change(screen.getByLabelText(/quantity/i), { target: { value: '-5' } });
    
        fireEvent.click(screen.getByRole('button', { name: /add product/i }));

        expect(await screen.findByText(/Product name must be at least 3 characters long./i)).toBeInTheDocument();
        fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'productnew' } });
        fireEvent.change(screen.getByLabelText(/description/i), { target: { value: 'productnewdescription' } });
        
        fireEvent.click(screen.getByRole('button', { name: /add product/i }));

        await expect(await screen.findByText(/Price must be a positive number./i)).toBeInTheDocument();



    });

    test('submits the form successfully with valid inputs', async () => {
        axios.post.mockResolvedValueOnce({ data: { message: 'Product added successfully' } });

        render(
            <Router>
                <ProductForm />
            </Router>
        );

        fireEvent.change(screen.getByLabelText(/product name/i), { target: { value: 'Test Product' } });
        fireEvent.change(screen.getByLabelText(/description/i), { target: { value: 'A test description' } });
        fireEvent.change(screen.getByLabelText(/price/i), { target: { value: '100' } });
        fireEvent.change(screen.getByLabelText(/quantity/i), { target: { value: '10' } });

        fireEvent.click(screen.getByRole('button', { name: /add product/i }));

        await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
        expect(axios.post).toHaveBeenCalledWith(
            'http://localhost:5000/products/',
            {
                name: 'Test Product',
                description: 'A test description',
                price: '100',
                quantity: '10'
            },
            expect.any(Object) // match headers and options
        );
    });
});
