# ProductsMnagmentSystem

## Overview
This project is a RESTful API for product management, built with Flask. It supports user authentication and provides endpoints for CRUD operations on products. The API is documented using Swagger (Flask-RestX).

## Technologies Used
- **Backend**: Flask, Flask-RESTx, Flask-JWT-Extended, Marshmallow, SQLAlchemy
- **Database**: SQLite
- **ORM**:SQLALchemy
- **Frontend**:  React
- **Documentation**: Swagger

## Setup Instructions

### Prerequisites
- Python 3.7 or higher
- pip
- SQLite

### Clone the Repository

git clone (https://github.com/alaasalahelden20/ProductsMnagmentSystem/pull/new/master)
cd <repository-directory>

### Create a Virtual Environment


python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`

### Install Dependencies

pip install -r requirements.txt

Configure the Database

    Create a new SQLite database.
    Update the database connection string in your application configuration file (e.g., config.py).

### Run the Application

export FLASK_APP=your_app_name  # On Windows use `set FLASK_APP=your_app_name`
export FLASK_ENV=development      # For development environment
flask run

### Accessing the API Documentation

Open your browser and go to http://localhost:5000 to view the Swagger documentation.
API Endpoints
Authentication

    POST /Auth/login: User login
    POST /Auth/register: User registration
    GET /Auth/protected: Protected resource (requires JWT)

Product Management

    GET /products/: List all products
    POST /products/: Create a new product
    GET /products/<id>: Retrieve a product by ID
    PUT /products/<id>: Update a product
    DELETE /products/<id>: Delete a product

## How to Run Tests

    Ensure your virtual environment is active.
    Run backend flask tests using: pytest 
    Run react tests using: npm tests

Notes

    Ensure that you have the appropriate environment variables set for JWT secret key and database URL.
    For production, configure logging and error handling as needed.




