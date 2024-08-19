
# ProductsManagementSystem

## Overview
This project is a RESTful API for product management, built with Flask. It supports user authentication and provides endpoints for CRUD operations on products. The API is documented using Swagger (Flask-RestX).

## Technologies Used
- **Backend**: Flask, Flask-RESTx, Flask-JWT-Extended, Marshmallow, SQLAlchemy
- **Database**: SQLite
- **ORM**: SQLAlchemy
- **Frontend**: React
- **Documentation**: Swagger

## Setup Instructions

### Prerequisites
- Python 3.7 or higher
- pip
- SQLite
- Docker (if using Docker to run the application)

### Clone the Repository
```bash
git clone https://github.com/alaasalahelden20/ProductsMnagmentSystem/pull/new/master
cd <repository-directory>
```

### Option 1: Manual Setup

#### Create a Virtual Environment
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
```

#### Install Dependencies
```bash
pip install -r requirements.txt
```

#### Configure the Database
- Create a new SQLite database.
- Update the database connection string in your application configuration file (e.g., `config.py`).

#### Run the Application
```bash
export FLASK_APP=your_app_name  # On Windows use `set FLASK_APP=your_app_name`
export FLASK_ENV=development      # For development environment
flask run
```

### Option 2: Docker Setup

#### Building the Docker Image
If you prefer to run the application using Docker, follow these steps:

1. Ensure Docker is installed on your system.
2. Build the Docker image:
    ```bash
    docker build -t products-management-system .
    ```

#### Running the Docker Container
To run the application in a Docker container, use the following command:

```bash
docker run -p 5000:5000 -d products-management-system
```

### Accessing the API Documentation
Open your browser and go to [http://localhost:5000](http://localhost:5000) to view the Swagger documentation.

### API Endpoints

#### Authentication
- **POST /Auth/login**: User login
- **POST /Auth/register**: User registration
- **GET /Auth/protected**: Protected resource (requires JWT)

#### Product Management
- **GET /products/**: List all products
- **POST /products/**: Create a new product
- **GET /products/\<id\>**: Retrieve a product by ID
- **PUT /products/\<id\>**: Update a product
- **DELETE /products/\<id\>**: Delete a product

## How to Run Tests

1. Ensure your virtual environment is active (if not using Docker).
2. Run backend Flask tests using:
   ```bash
   pytest
   ```
3. Run React tests using:
   ```bash
   npm test
   ```

## Notes

- Ensure that you have the appropriate environment variables set for the JWT secret key and database URL.
- For production, configure logging and error handling as needed.
- If using Docker, you can also push your Docker image to a container registry (e.g., Docker Hub) for deployment.

### Pushing to Docker Hub (Optional)
If you want to push your Docker image to Docker Hub, tag and push it with:

```bash
docker tag products-management-system username/products-management-system:latest
docker push username/products-management-system:latest
```
```

This updated documentation includes instructions for setting up and running the application both manually and using Docker, giving users the flexibility to choose their preferred method.
