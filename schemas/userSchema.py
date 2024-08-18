# schemas/user_schema.py
from marshmallow import Schema, fields, validates, ValidationError
import re
import logging
logger = logging.getLogger(__name__)
class UserSchema(Schema):
    username = fields.Str(required=True)
    password = fields.Str(required=True)

    @validates('username')
    def validate_username(self, value):
        # Check length constraints
        if len(value) < 3:
            raise ValidationError("Username must be at least 3 characters long.")
        if len(value) > 20:
            raise ValidationError("Username must be at most 20 characters long.")
        
        # Check for invalid characters
        if not re.match("^[a-zA-Z0-9_]+$", value):
            raise ValidationError("Username must only contain letters, numbers, and underscores.")
        
        # Ensure it doesn't start or end with an underscore or space
        if value[0] in ['_', ' '] or value[-1] in ['_', ' ']:
            raise ValidationError("Username cannot start or end with an underscore or space.")
        
    
    @validates('password')
    def validate_password(self, value):
        if not value:
            raise ValidationError("Password is required.")
        if len(value) < 6:
            raise ValidationError("Password must be at least 6 characters long.")
