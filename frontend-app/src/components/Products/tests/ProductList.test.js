import { render, screen, fireEvent } from '@testing-library/react';
import ProductList from '../ProductList';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';
import { waitFor } from '@testing-library/react';

jest.mock('axios');

test('renders loading spinner initially', () => {
    axios.get.mockResolvedValueOnce({ data: [] });
    render(<Router><ProductList /></Router>);
    waitFor(() => {
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  })

});

test('displays error message on fetch failure', async () => {
    axios.get.mockRejectedValueOnce(new Error('Network Error'));
    render(<Router><ProductList /></Router>);
    waitFor(() => {
    expect( screen.findByText('Error fetching products')).toBeInTheDocument();
  })

});

test('renders product list', async () => {
  const products = [{ id: 29, name: 'ProductTest', description: 'ProductTest', price: 12.0, quantity: 21,created_at: '2024-08-16 02:14:06', updated_at: '2024-08-16 02:14:06' }];
  axios.get.mockResolvedValueOnce({ data: products });
    
    render(<Router><ProductList /></Router>);
    waitFor(() => {
    expect( screen.findByText('Product List')).toBeInTheDocument();
    expect( screen.getByText('ProductTest')).toBeInTheDocument();
  })
});