from sqlalchemy.orm import backref
from market import db,login_manager

from flask_login import UserMixin

@login_manager.user_loader
def load_user(user_id):
    return Patients.query.get(int(user_id))

class Model():
    def as_dict(self):
        return { c.name: getattr(self, c.name) for c in self.__table__.columns }

class Patients(db.Model, UserMixin,Model):
    __tablename__ = 'patients'
    id = db.Column(db.Integer(), primary_key=True)
    fullname = db.Column(db.String(length=30), nullable=False, unique=False)
    email_address = db.Column(db.String(length=50), nullable=False, unique=True)
    password_hash = db.Column(db.String(length=600), nullable=False)
    username = db.Column(db.String(length=30), nullable=False, unique=True)

    def __init__(self,fullname,email_address,password,username):
        self.fullname=fullname
        self.email_address=email_address
        self.password_hash=password
        self.username=username

    @property
    def password(self):
        return self.password

    @password.setter
    def password(self, plain_text_password):
        self.password_hash = plain_text_password

    def check_password_correction(self, attempted_password):
        return (self.password_hash, attempted_password)
