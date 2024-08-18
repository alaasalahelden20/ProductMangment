from marshmallow import Schema, fields, validates, ValidationError

class ProductSchema(Schema):
    name = fields.Str(required=True)
    price = fields.Float(required=True)
    description = fields.Str(required=False)
    quantity=fields.Integer(required=True)
    created_at = fields.DateTime(dump_only=True)  # Only for serialization
    updated_at = fields.DateTime(dump_only=True)  # Only for serialization

    @validates('name')
    def validate_name(self, value):
        if not value:
            raise ValidationError("Product name is required.")
        if len(value) < 3:
            raise ValidationError("Product name must be at least 3 characters long.")

    @validates('price')
    def validate_price(self, value):
        if value is None:
            raise ValidationError("Price is required.")
        if value <= 0:
            raise ValidationError("Price must be greater than zero.")
    @validates('quantity')
    def validate_quantity(self, value):
        if value is None:
            raise ValidationError("quantity is required.")
        if value <= 0:
            raise ValidationError("quantity must be greater than zeroand integer.")

    @validates('description')
    def validate_description(self, value):
        if value and len(value) > 200:
            raise ValidationError("Description cannot exceed 200 characters.")

class ProductUpdateSchema(Schema):
    name = fields.Str()
    price = fields.Float()
    description = fields.Str()
    quantity=fields.Integer()
    

    @validates('name')
    def validate_name(self, value):
        if not value:
            raise ValidationError("Product name is required.")
        if len(value) < 3:
            raise ValidationError("Product name must be at least 3 characters long.")

    @validates('price')
    def validate_price(self, value):
        if value is None:
            raise ValidationError("Price is required.")
        if value <= 0:
            raise ValidationError("Price must be greater than zero.")
    @validates('quantity')
    def validate_quantity(self, value):
        if value is None:
            raise ValidationError("quantity is required.")
        if value <= 0:
            raise ValidationError("quantity must be greater than zeroand integer.")

    @validates('description')
    def validate_description(self, value):
        if value and len(value) > 200:
            raise ValidationError("Description cannot exceed 200 characters.")
