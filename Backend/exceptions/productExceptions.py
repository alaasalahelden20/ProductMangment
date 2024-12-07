class ProductNotFoundError(Exception):
    """Exception raised when a product is not found in the database."""
    def __init__(self, product_id, message="Product not found"):
        self.product_id = product_id
        self.message = f"{message}: Product ID {product_id}"
        super().__init__(self.message)

class ProductAlreadyExistsError(Exception):
    """Exception raised when a product is already found in the database."""
    def __init__(self, product_name, message="Product already found"):
        self.product_name = product_name
        self.message = f"{message}: Product Name {product_name}"
        super().__init__(self.message)
