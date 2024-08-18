from models.dp import db
from models.user import User
import logger,logging

logger = logging.getLogger(__name__)

class UserRepository:

    @staticmethod
    def get_all():
        return User.query.all()

    @staticmethod
    def get_by_id(user_id):
        return User.query.get_or_404(user_id)
    @staticmethod
    def get_user_by_username(username):
        return User.query.filter_by(username=username).first()

    @staticmethod
    def create(user_data):
        try:
        # Extract username and password from user_data
            username = user_data.get('username')
            password = user_data.get('password')

            if not username or not password:
                raise ValueError("Username and password are required")

            # Check if user already exists
            if User.query.filter_by(username=username).first():
                raise ValueError("Username already exists")            
            # Create new user instance
            new_user = User(username=username)
            new_user.set_password(password)  # Use set_password to hash and set the password

            # Add new user to the database
            db.session.add(new_user)
            db.session.commit()

            return new_user
        except ValueError as e:
            db.session.rollback()
            # Handle specific error cases
            logger.warning(f"User creation failed: {e}")
            raise e   
        except Exception as e:
            # Rollback and log unexpected errors
            db.session.rollback()
            logger.error(f"An error occurred while creating a user: {e}")
            raise e

    @staticmethod
    def update(user_id, User_data):
        user = UserRepository.get_by_id(user_id)
        for key, value in User_data.items():
            setattr(user, key, value)
        db.session.commit()
        return user

    @staticmethod
    def delete(user_id):
        user = UserRepository.get_by_id(user_id)
        db.session.delete(user)
        db.session.commit()
        return user
