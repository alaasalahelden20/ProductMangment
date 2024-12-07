from repositories.product_repository import ProductRepository
from exceptions.productExceptions import *
from sqlalchemy.exc import SQLAlchemyError
import logging

logger = logging.getLogger(__name__)

class ProductService:

    @staticmethod
    def get_all_products():
        return ProductRepository.get_all()
    @staticmethod
    def get_product_by_id(product_id):
        product= ProductRepository.get_by_id(product_id)
            
        if not product:
            raise ProductNotFoundError(product_id)
        return product
        
            
    @staticmethod
    def get_by_product_name(product_name):
       return ProductRepository.get_by_product_name(product_name)
   
        
        

    @staticmethod
    def create_product(product_data):
        if ProductRepository.get_by_product_name(product_data['name']):
            raise ProductAlreadyExistsError(product_data['name'])
        return ProductRepository.create_product(product_data)

    @staticmethod
    def update_product(product_id, product_data):
        try:
    
         return ProductRepository.update(product_id, product_data)
        except ProductNotFoundError:
            raise


    @staticmethod
    def delete_product(product_id):
        try:
            return ProductRepository.delete(product_id)

        except ProductNotFoundError:
            raise 
        