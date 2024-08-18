# tests/conftest.py
import pytest
from run import create_app
  # Import your Flask app factory function

@pytest.fixture
def app():
    app = create_app('testing')  # Adjust for your app factory and testing config
    yield app

@pytest.fixture
def client(app):
    return app.test_client()
