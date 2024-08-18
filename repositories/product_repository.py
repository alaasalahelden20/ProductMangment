from models.dp import db
from models.product import Product
import logger,logging
from exceptions.productExceptions import ProductNotFoundError
from sqlalchemy.exc import IntegrityError
import sqlite3
logger = logging.getLogger(__name__)


class ProductRepository:



    @staticmethod
    def get_all():
        return Product.query.all()

    @staticmethod
    def get_by_id(product_id):

        return Product.query.get_or_404(product_id)
    @staticmethod
    def get_by_product_name(name):
        product=Product.query.filter_by(name=name).first()
        return product

    @staticmethod
    def create_product(product_data):
        try:
            new_product = Product(**product_data)
            
            db.session.add(new_product)
            db.session.commit()
            return new_product
       
        except Exception as e:
            logger.error(f"An error occurred while creating a product: {e}")
            db.session.rollback()
            raise

    @staticmethod
    def update(product_id, product_data):
        product = ProductRepository.get_by_id(product_id)
        if not product:
            raise ProductNotFoundError(product_id)

        for key, value in product_data.items():
            setattr(product, key, value)

        db.session.commit()
        return product

    @staticmethod
    def delete(product_id):
        product = ProductRepository.get_by_id(product_id)
        if not product:
            raise ProductNotFoundError(product_id)
        db.session.delete(product)
        db.session.commit()
        return product
