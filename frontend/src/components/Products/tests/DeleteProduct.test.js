import { render, screen, fireEvent } from '@testing-library/react';
import DeleteProduct from '../DeleteProduct';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('axios');

test('renders delete confirmation', () => {
    render(<Router><DeleteProduct /></Router>);
    expect(screen.getByText('Are you sure you want to delete this product?')).toBeInTheDocument();
});

test('handles delete action', async () => {
    axios.delete.mockResolvedValueOnce({});
    render(<Router><DeleteProduct /></Router>);
    fireEvent.click(screen.getByText('Delete'));
    // Add assertions for navigation or confirmation
});