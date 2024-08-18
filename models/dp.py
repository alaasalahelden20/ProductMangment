from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from marshmallow import Schema, fields, post_load


from sqlalchemy.sql import func
from sqlalchemy.orm import declarative_base

db = SQLAlchemy()
ma = Marshmallow()

