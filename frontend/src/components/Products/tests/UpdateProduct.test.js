import { render, screen, fireEvent,act } from '@testing-library/react';
import UpdateProduct from '../UpdateProduct';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';
import { waitFor } from '@testing-library/react';

jest.mock('axios');


test('renders update form', async () => {
    axios.get.mockResolvedValueOnce({ data: { id: 29, name: 'ProductTest' ,description: 'ProductTest', price: 12.0, quantity: 21,created_at: '2024-08-16 02:14:06', updated_at: '2024-08-16 02:14:06' }});
    render(<Router><UpdateProduct /></Router>);
    waitFor(()=>{
    expect( screen.findByLabelText('Name')).toBeInTheDocument();
    })
});

test('handles form submission', async () => {
    axios.put.mockResolvedValueOnce({});
    render(<Router><UpdateProduct /></Router>);
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Updated Product' } });
    fireEvent.click(screen.getByTestId("Update_Product_button"));
    // Add assertions for redirection or success message

    await act(async () => {
      fireEvent.click(screen.getByTestId("Update_Product_button"));
  });

});