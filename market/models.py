from sqlalchemy.orm import backref, relationship
from market import db,login_manager

from flask_login import UserMixin
from datetime import datetime


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id)) 

class User(db.Model,UserMixin):
    __tablename__ = 'users'
    id = db.Column(db.Integer(), primary_key=True)
    username = db.Column(db.String(length=30), nullable=False, unique=True)
    email_address = db.Column(db.String(length=50), nullable=False, unique=True)
    password_hash = db.Column(db.String(length=600), nullable=False)
    budget = db.Column(db.Integer(), nullable=False, default=0)
    # items = db.relationship('Item', backref='owned_user', lazy=True)
    can_view_past_history=db.relationship('past_history_of_illness',backref='user', lazy=True)    

    # @property
    # def prettier_budget(self):
    #     if len(str(self.budget)) >= 4:
    #         return f'Rs {str(self.budget)[:-3]},{str(self.budget)[-3:]}'
    #     else:
    #         return f"Rs {self.budget}"

    @property
    def password(self):
        return self.password

    @password.setter
    def password(self, plain_text_password):
        self.password_hash = plain_text_password

    def check_password_correction(self, attempted_password):
        return (self.password_hash, attempted_password)  

    def can_purchase(self, item_obj):
        return self.budget >= 0  

    def can_sell(self, item_obj):
        return item_obj in self.items

# class Item(db.Model):
#     id = db.Column(db.Integer(), primary_key=True)
#     name = db.Column(db.String(length=30), nullable=False, unique=True)
#     price = db.Column(db.Integer(), nullable=False)
#     barcode = db.Column(db.String(length=12), nullable=False, unique=True)
#     description = db.Column(db.String(length=1024), nullable=False, unique=True)
#     owner= db.Column(db.Integer(),db.ForeignKey('users.id'))
#     def __repr__(self):
#         return f'Item {self.name}'

#     def buy(self, user):
#         self.owner = user.id
#         user.budget += self.price
#         db.session.commit()

#     def sell(self, user):
#         self.owner = None
#         user.budget -= self.price
#         db.session.commit()


class AdminUser(db.Model, UserMixin):
    __tablename__ = 'admin'
    id = db.Column(db.Integer(), primary_key=True)
    username = db.Column(db.String(length=30), nullable=False, unique=True)
    email_address = db.Column(db.String(length=50), nullable=False, unique=True)
    password_hash = db.Column(db.String(length=60), nullable=False)

class past_history_of_illness:
    __tablename__='past_history'
    id=db.Column(db.Integer(), primary_key=True)
    problem = db.Column(db.String(length=30), nullable=False)
    body_site=db.Column(db.String(length=30), nullable=False)
    dateTime = db.Column(db.DateTime, nullable = False)
    severity = db.Column(db.String(length=30), nullable=False)
    last_updated=db.Column(db.DateTime, nullable = False)
    user_id=db.Column(db.Integer(),db.ForeignKey('users.id'))
    user=db.relationship('User  ',backref='past_history')   


    
db.create_all()
db.session.commit()