import { render, screen } from '@testing-library/react';
import ProductDetails from '../ProductDetails';
import axios from 'axios';
import { BrowserRouter as Router, Route ,Routes} from 'react-router-dom';
import { waitFor } from '@testing-library/react';

jest.mock('axios');

test('renders loading state', () => {
    render(<Router><ProductDetails /></Router>);
    
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
});

test('displays product details', async () => {
    axios.get.mockResolvedValueOnce({ data: { id: 29, name: 'ProductTest', description: 'ProductTest', price: 12.0, created_at: '2024-08-16 02:14:06', updated_at: '2024-08-16 02:14:06' }  });
    render(
        <Router>
            <Routes>
                <Route path="/products/:id" element={<ProductDetails />} />
            </Routes>
        </Router>
    );
    waitFor(() => {
    expect( screen.findByText('ProductTest')).toBeInTheDocument();
    })
});