from flask import Flask,render_template
from flask_sqlalchemy import SQLAlchemy

from flask_login import LoginManager
from flask_cors import CORS, cross_origin
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False
app.config['SECRET_KEY']='d8c054f87c3a6142b8aea948'
app.config['MAIL_SERVER']='smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = 'siddhukanu3@gmail.com'
app.config['MAIL_PASSWORD'] = 'Sidd@2476'
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
db=SQLAlchemy(app)
login_manager = LoginManager(app)
login_manager.login_view = "login_page"
login_manager.login_message_category = "info"
from market import routes

