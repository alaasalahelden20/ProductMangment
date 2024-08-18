import pytest
from app import create_app
from flask_jwt_extended import create_access_token
from freezegun import freeze_time
from services.product_service import ProductService
from schemas.productSchema import ProductSchema
from exceptions.productExceptions import ProductNotFoundError
from unittest.mock import patch
from config import TestConfig
import datetime
# Test Configuration


@pytest.fixture
def app():
    # Create the Flask app with test configuration
    app = create_app(TestConfig)
    yield app

@pytest.fixture
def client(app):
    return app.test_client()

@pytest.fixture
def auth_headers(client):
    # Create a test JWT token
    access_token = create_access_token(identity='testuser')
    return {'Authorization': f'Bearer {access_token}'}

def test_freeze_time():
    assert datetime.datetime.now() != datetime.datetime(2024, 8, 16)
    # Mocking the time to be 2024-08-16
    with freeze_time("2024-08-16"):
        assert datetime.datetime.now() == datetime.datetime(2024, 8, 16)
    # Without the mock, the time should be back to normal
    assert datetime.datetime.now() != datetime.datetime(2024, 8, 16)

class MockProduct:
    def __init__(self, id, name, price, quantity, description):
        self.id = id
        self.name = name
        self.price = price
        self.quantity = quantity
        self.description = description

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'price': self.price,
            'quantity': self.quantity,
            'description': self.description
        }
def test_get_products(client):
    # Mock the service method to return an empty list or test products
    ProductService.get_all_products = lambda: []
    response = client.get('/products/')
    assert response.status_code == 200
    assert response.json == []

@patch('services.product_service.ProductService.get_product_by_id')
def test_get_product(mock_get_product_by_id, client):
    # Mock the service method to return a MockProduct object
    mock_get_product_by_id.return_value = MockProduct(6, 'testid6', 20.0, 10, 'testid6')

    # Make the GET request
    response = client.get('/products/6')

    # Assert the response status code
    assert response.status_code == 200
    assert response.json['id'] == 6
    assert response.json['name'] == 'testid6'

def test_get_product_not_found(client):
    # Mock the service method to raise ProductNotFoundError
    ProductService.get_product_by_id = lambda id: (_ for _ in ()).throw(ProductNotFoundError(id))
    response = client.get('/products/999')
    assert response.status_code == 404
    assert response.json['error'] == 'Product not found'

@patch('services.product_service.ProductService.create_product')
def test_service_create_product(mock_create_product):
    mock_create_product.return_value = {'id': 1, 'name': 'Test Product', 'price': 20.0, 'quantity': 10}
    data = {
        'name': 'Test Product',
        'price': 20.0,
        'quantity': 10
    }
    result = ProductService.create_product(data)
    assert result['name'] == 'Test Product'
    assert result['price'] == 20.0



@patch('services.product_service.ProductService.update_product')
def test_update_product_valid_data(mock_update_product, client, auth_headers):
    valid_data = {
        "name": 'ProductTest1',
        "price": 12.0,
        "description": 'ProductTest',
        "quantity": 21 
    }

    # Mock the service method to return a dictionary
    mock_product = MockProduct(29, 'ProductTest1', 12.0, 21, 'ProductTest')
    mock_update_product.return_value = mock_product

    response = client.put('/products/29', json=valid_data, headers=auth_headers)

    assert response.status_code == 200
    response_json = response.json
    assert response_json['id'] == 29
    assert response_json['name'] == 'ProductTest1'
    assert response_json['price'] == 12.0
    assert response_json['description'] == 'ProductTest'
    assert response_json['quantity'] == 21


@patch('services.product_service.ProductService.update_product')
def test_update_product_minimal_data(mock_update_product, client, auth_headers):
    minimal_data = {
        "name": "Minimal Product",
        "price": 10.0
    }

    mock_product = MockProduct(29, 'Minimal Product', 10.0, 21, 'ProductTest')
    mock_update_product.return_value = mock_product


    response = client.put('/products/29', json=minimal_data, headers=auth_headers)

    assert response.status_code == 200
    response_json = response.json
    assert response_json['name'] == 'Minimal Product'
    assert response_json['price'] == 10.0

@patch('services.product_service.ProductService.update_product')
def test_update_non_existing_product(mock_update_product, client, auth_headers):
    mock_update_product.side_effect = ProductNotFoundError(id)

    valid_data = {
        "name": "Non-existent Product",
        "price": 30.0,
        "description": "Non-existent",
        "quantity": 10
    }

    response = client.put('/products/9999', json=valid_data, headers=auth_headers)

    assert response.status_code == 404
    assert response.json['error'] == 'Product not found'

def test_update_product_no_auth(client):
    valid_data = {
        "name": "Unauthorized Product",
        "price": 25.0,
        "description": "Unauthorized",
        "quantity": 5
    }

    response = client.put('/products/6', json=valid_data)

    assert response.status_code == 401
    assert response.json['msg'] == 'Missing Authorization Header'

def test_delete_product(client, auth_headers):
    # Mock ProductService.delete_product method
    ProductService.delete_product = lambda id: None
    response = client.delete('/products/1', headers=auth_headers)
    assert response.status_code == 204

def test_delete_product_not_found(client, auth_headers):
    # Mock ProductService.delete_product to raise ProductNotFoundError
    ProductService.delete_product = lambda id: (_ for _ in ()).throw(ProductNotFoundError(id))
    response = client.delete('products/222', headers=auth_headers)
    assert response.status_code == 404
    assert response.json['error'] == 'Product not found'

@patch('services.product_service.ProductService.update_product')
def test_update_product_response_content_type(mock_update_product, client, auth_headers):
    valid_data = {
        "name": "Content Type Product",
        "price": 50.0,
        "description": "Content Type",
        "quantity": 10
    }

    mock_update_product.return_value = {
        'id': 6,
        'name': 'Content Type Product',
        'price': 50.0,
        'description': 'Content Type',
        'quantity': 10
    }

    response = client.put('/products/6', json=valid_data, headers=auth_headers)

    assert response.headers['Content-Type'] == 'application/json'

def test_create_product_missing_required_fields(client, auth_headers):
    missing_fields_data = {
        "name": "Product with Missing Fields"

        # Missing 'price', 'description', and 'quantity'
    }

    response = client.post('/products/', json=missing_fields_data, headers=auth_headers)

    assert response.status_code == 400
    assert 'price' in response.json
    assert 'quantity' in response.json

def test_create_product_invalid_data_types(client, auth_headers):
    invalid_data = {
        "name": "Invalid Data Types",
        "price": "not-a-number",  # Invalid type, should be float
        "description": "Invalid price field",
        "quantity": "not-a-number"  # Invalid type, should be integer
    }

    response = client.post('/products/', json=invalid_data, headers=auth_headers)

    assert response.status_code == 400
    assert 'price' in response.json
    assert 'quantity' in response.json
def test_create_product_invalid_quantity(client, auth_headers):
    invalid_data = {
        "name": "Product with Invalid Quantity",
        "price": 20.0,
        "description": "Invalid quantity field",
        "quantity": -5  # Negative quantity
    }

    response = client.post('/products/', json=invalid_data, headers=auth_headers)

    assert response.status_code == 400
    assert 'quantity' in response.json


