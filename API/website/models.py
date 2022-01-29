from . import db
from flask_login import UserMixin
from sqlalchemy.sql import func

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(150), unique=True)
    password = db.Column(db.String(500))
    username = db.Column(db.String(150), unique=True)
    images = db.relationship("Image")

    def __init__(self, email, password, username):
        self.email = email
        self.password = password
        self.username = username

class Image(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    notes = db.Column(db.String(1000))
    file = db.Column(db.String(300))
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    date = db.Column(db.DateTime(timezone=True), default=func.now())