# routes/auth.py
from flask import request, jsonify, abort
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity,verify_jwt_in_request
from flask_jwt_extended.exceptions import NoAuthorizationError
from jwt.exceptions import InvalidSignatureError,ExpiredSignatureError
import jwt
from services.auth_service import AuthService
from schemas.userSchema import UserSchema
import logging
from marshmallow import ValidationError
from flask_restx import Namespace, Resource, fields

logging.basicConfig(level=logging.ERROR)
logger = logging.getLogger(__name__)

user_schema = UserSchema()
UserNamespace = Namespace('Users', description='Users Authentication operations')

#Define user_model for request validation
user_model = UserNamespace.model('User', {
    'username': fields.String(required=True, description='Username'),
    'password': fields.String(required=True, description='Password'),
})

@UserNamespace.errorhandler(Exception)
def handle_exception(e):
    if isinstance(e, NoAuthorizationError):
        logger.error(f"NoAuthorizationError {e}")
        return {"message": "Missing Authorization Header"}, 401
    if isinstance(e, InvalidSignatureError):
        logger.error(f"Expired JWT token: {e}")

        return jsonify({"message": "Invalid token signature"}), 401
    if isinstance( e,ExpiredSignatureError):
       logger.error(f"Expired JWT token: {e}")
       return jsonify({"msg": "Token has expired"}), 401

    # General error handler
    return jsonify({"message": str(e)}), 500


@UserNamespace.route('/login')
class UserLogin(Resource):

    @UserNamespace.expect(user_model)
 #  @UserNamespace.doc('user_login', responses={400: "Missing username or password", 401: "Username or password not correct"})
    def post(self):
        data = request.json

        if not data or not all(key in data for key in ('username', 'password')):
            logger.warning('Missing data in login request')
            return {"msg": "Missing username or password"}, 400
        
        username = data.get('username')
        password = data.get('password')
        
        user = AuthService.get_user_by_username(username)
        if user and user.check_password(password):
            access_token = create_access_token(identity=user.id)
            return {"access_token": access_token}, 200
        
        return {"msg": "Username or password not correct"}, 401

@UserNamespace.route('/protected')

class UserProtected(Resource):
    @UserNamespace.doc('protected_resource',responses={
        200: "Success",
        401: "User not authorized",
        404: "User not found"
    })
    @jwt_required()
    @UserNamespace.errorhandler(Exception)
    def get(self):
        try:
            user_id = get_jwt_identity()
            user = AuthService.get_user_by_id(user_id)
            if user is None:
                logger.warning(f"User with ID {user_id} not found.")
                return {"msg": "User not authorized"}, 404

            return {"logged_in_as": user.username}, 200
        
        except NoAuthorizationError as e:
            return {"error": "Authorization header is missing"}, 401
        except InvalidSignatureError as e:
            return jsonify({"error": e}), 401

        except Exception as e:
            return {"error": e}, 500
        


        
        
        
@UserNamespace.route('/register')
class UserRegister(Resource):
    @UserNamespace.doc('user_register')
    @UserNamespace.expect(user_model)
    def post(self):
        data = request.json
        
        if not data or not all(key in data for key in ('username', 'password')):
            logger.warning('Missing data in register request')
            return {"msg": "Missing username or password"}, 400
        
        try:
            validated_data = user_schema.load(data)
            AuthService.create_user(validated_data)
            return {"msg": "User created successfully"}, 201
        except ValidationError as err:
            logger.warning(f"Validation errors: {err.messages}")
            return err.messages, 400
        except ValueError as e:
            logger.warning(f"User creation failed: {e}")
            return {"msg": str(e)}, 400
        except Exception as e:
            logger.error(f"Unexpected error during user registration: {e}")
            return {"msg": "Failed to create user due to an unexpected error"}, 500