from flask import  request, jsonify, abort
from flask_jwt_extended import jwt_required
import logging
from marshmallow import ValidationError
from flask_restx import Namespace, Resource,fields,reqparse
from services.product_service import ProductService
from exceptions.productExceptions import *
from schemas.productSchema import ProductSchema,ProductUpdateSchema

from sqlalchemy.exc import IntegrityError,SQLAlchemyError


# Logging configuration
logging.basicConfig(level=logging.ERROR)
logger = logging.getLogger(__name__)

# Schemas for data validation
product_schema = ProductSchema()
product_update_schema=ProductUpdateSchema()

# Namespace for API documentation and management
ProductNamespace = Namespace('products', description='Product operations')

# Define the model for API documentation
# This model describes the structure of the product data for API consumers.
product_model = ProductNamespace.model('Product', {
    'id': fields.Integer(description='Product ID', readonly=True),
    'name': fields.String(required=True, description='Product Name'),
    'description': fields.String(required=True, description='Product Description'),
    'price': fields.Float(required=True, description='Product Price'),
    'quantity': fields.Integer(required=True, description='Product Quantity'),
    'created_at': fields.DateTime(description='Creation Timestamp', readonly=True),
    'updated_at': fields.DateTime(description='Last Updated Timestamp', readonly=True)
})

@ProductNamespace.errorhandler(ProductAlreadyExistsError)
def handle_ProductAlreadyExistsError(e):
        return {"error": str(e)}, 400

 
# Define routes and their corresponding methods

@ProductNamespace.route('/')
class ProductList(Resource):

    # List all products
    @ProductNamespace.doc('list_products')
    @ProductNamespace.marshal_list_with(product_model)
    @ProductNamespace.errorhandler(ProductAlreadyExistsError)

    def get(self):
        try:
            products = ProductService.get_all_products()
            return [p.to_dict() for p in products]
        except Exception as e:
            logger.error(f"Error fetching products: {e}")
            return {'error': 'Failed to fetch products. Please try again later.'}, 500

    #create product
    @ProductNamespace.expect(product_model)
    @ProductNamespace.doc('add product')
   
    @jwt_required()

    def post(self):
        data = request.json
        try:
            # Validate the incoming data
            validated_data = product_schema.load(data)
        
            # Create the product
            product = ProductService.create_product(validated_data)
            return product.to_dict(), 201
        
        except ValidationError as e:
            logger.warning(f"Validation error: {e.messages}")
            return e.messages, 400
        except SQLAlchemyError as e:
            logger.error(f"Database error occurred:{e}")
            return {"error": "Database error occurred"}, 500

        except ProductAlreadyExistsError as e:
            logger.warning(f"Product already exists: {e}")
            return {"error": str(e)}, 400



        except Exception as e:
            logger.error(f"Unexpected error during product creation: {e}")
            return {"error": "An unexpected error occurred. Please try again later."}, 500
        
# Define routes and their corresponding methods that need id
@ProductNamespace.route('/<int:id>')
class Product(Resource):

    @ProductNamespace.doc('product_info',responses={
        404: 'Product not found'
    })
    @ProductNamespace.errorhandler(ProductAlreadyExistsError)

    #get product by its id
    def get(self,id):
        try:
            product = ProductService.get_product_by_id(id)
            return product.to_dict(), 200
        except ProductNotFoundError:
            logger.warning(f"Product with id {id} not found.")
            return {'error': 'Product not found'}, 404
        except Exception as e:
            logger.error(f"Error fetching product with id {id}: {e}")
            return {'error': 'Failed to fetch product. Please try again later.'}, 500
        


    #@ProductNamespace.expect(product_model)
    @ProductNamespace.doc('update_product',  responses={
        400: 'Validation error',
        404: 'Product not found',
        400: 'Please enter correct data'
    })
    @jwt_required()
    @ProductNamespace.errorhandler(ProductAlreadyExistsError)

    #update product
    def put(self,id):
    
        data = request.json

        try:
            if not data:
                return {"error": "please enter correct data"}, 400
            
            
            # Validate the incoming data
            validated_data = product_update_schema.load(data)
            print("validated")
            updated_product = ProductService.update_product(id, validated_data)
            return updated_product.to_dict(), 200
        
        except ValidationError as e:
            logger.warning(f"Validation error: {e.messages}")
            return e.messages, 400
        
        except ProductNotFoundError:
            logger.warning(f"Product with id {id} not found.")
            return {'error': 'Product not found'}, 404        
        except Exception as e:
            logger.error(f"Unexpected error: {e}")
            return {'error': 'An unexpected error occurred'}, 500
        


    @jwt_required()
    @ProductNamespace.errorhandler(ProductAlreadyExistsError)
    @ProductNamespace.doc('delete_product', responses={204: 'Product deleted', 404: 'Product not found'})
    #delete product
    def delete(self,id):
        try:
            ProductService.delete_product(id)
            return {'msg': 'Product deleted'}, 204
        except ProductNotFoundError:
            logger.warning(f"Product with id {id} not found.")
            return {'error': 'Product not found'}, 404
        except Exception as e:
            logger.error(f"Unexpected error during product deletion: {e}")
            return {"error": "An unexpected error occurred. Please try again later."}, 500