from flask import Flask
from flask_migrate import Migrate
from config import Config,TestConfig
from flask_jwt_extended import JWTManager
from flask_restful import Api
from models.dp import db, ma
from flask_restx import Api
from flask_cors import CORS
from controllers.product_controller import ProductNamespace
from controllers.auth_controller import UserNamespace
import logging


logging.basicConfig(level=logging.INFO)  # Set level to INFO or DEBUG as needed
logger = logging.getLogger(__name__)

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    api = Api(app, version='1.0', title='Product managment System', description='A Product managment application')

    CORS(app, supports_credentials=True, resources={r"/*": {"origins":  "https://product-mangment-r2kjpkjaf-alaa-salaheldens-projects.vercel.app/"}})
    db.init_app(app)
    jwt = JWTManager(app)
    jwt._set_error_handler_callbacks(api)
    
    # Initialize Migrate with the app and db instances
    migrate = Migrate(app, db)

    
 
   

# Flask-RESTx Namespaces help with API documentation, defining models, and organizing endpoints.
    api.add_namespace(ProductNamespace, path='/products')
    api.add_namespace(UserNamespace, path='/auth')


    return app
