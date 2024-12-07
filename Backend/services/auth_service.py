from repositories.user_repository import UserRepository
import logger,logging

logger = logging.getLogger(__name__)
class AuthService:

    @staticmethod
    def get_all_users():
        return UserRepository.get_all()

    @staticmethod
    def get_user_by_id(user_id):
        return UserRepository.get_by_id(user_id)
    
    @staticmethod
    def get_user_by_username(username):
        return UserRepository.get_user_by_username(username)

    @staticmethod
    def create_user(user_data):
        try:
            return UserRepository.create(user_data)
        except ValueError as e:
            logger.warning(f"Error during user creation: {e}")
            raise e
        except Exception as e:
            logger.error(f"Error during user creation: {e}")
            raise e

    @staticmethod
    def update_user(user_id, user_data):
        try:
         return UserRepository.update(user_id, user_data)
        except Exception as e:
            logger.error(f"Error during updating user: {e}")
            raise e

    @staticmethod
    def delete_user(user_id):
        try:
            return UserRepository.delete(user_id)
        except Exception as e:
            logger.error(f"Error during deleting user : {e}")
            raise e
    
