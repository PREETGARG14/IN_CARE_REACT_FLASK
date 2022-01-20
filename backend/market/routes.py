from flask_mail import Mail, Message
import re
from flask import flash, json, session
from market import app
from flask import render_template, redirect, url_for, request, jsonify
from market.CreateMeet.create_event import createEvent
from market.models import Patients, Doctor, Prescription, past_history_of_illness, immunisation
from market import db
from flask_login import login_user, logout_user, login_required, current_user
from market.processor import chatbot_response
from functools import wraps
# from processor import chatbot_response
# imports for PyJWT authentication
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from flask import Response


# Setup the Flask-JWT-Extended extension
app.config["JWT_SECRET_KEY"] = "gydbybuduubchydbbu46t363vydw3u6y88hbb2"
jwt = JWTManager(app)

mail = Mail(app)  # instantiate the mail class


@app.route('/index', methods=["GET", "POST"])
def index():
    return render_template('index.html', **locals())


@app.route('/chatbot', methods=["GET", "POST"])
def chatbotResponse():

    if request.method == 'POST':
        the_question = request.form['question']

        response = chatbot_response(the_question)

    return jsonify({"response": response})


@app.route('/api/logout')
def logout_page():
    logout_user()
    flash("You have been logged out!", category='info')
    return redirect(url_for("home_page"))


@app.route("/api/login2", methods=['POST'])
def login():
    username = request.json['username']
    password = request.json['password']
    if username is "":
        result = {
            "status": "unsuccessful",
            "message": "Enter username"
        }
        return jsonify(result), 401

    if password is "":
        result = {
            "status": "unsuccessful",
            "message": "Enter Password"
        }
        return jsonify(result), 401

    attempted_user = Patients.query.filter_by(username=username).first()
    if attempted_user and attempted_user.password_hash == password:
        login_user(attempted_user)
        session['logged_in'] = True
        access_token = create_access_token(identity=username)
        result = {
            "status": "successful",
            "username": username,
            "message": "Login Successful",
            "access_token":access_token
        }
        return jsonify(result), 200
    else:
        result = {
            "status": "unsuccessful",
            "message": "Invalid Credentials"
        }
        return jsonify(result), 401
 


@app.route('/api/register2', methods=['POST'])
def register():
    username = request.json['username']
    attempted_user = Patients.query.filter_by(username=username).first()
    regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
    regexpass = r"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
    email_address = request.json['email_address']
    if(not re.fullmatch(regex, request.json['email_address'])):
        result = {
            "status": "unsuccessful",
            "email_address": email_address,
            "message": "Invalid Email"
        }
        return jsonify(result), 422
    if attempted_user is not None:
        result = {
            "status": "unsuccessful",
            "email_address": email_address,
            "message": "User already exists"
        }
        return jsonify(result), 409
    if(not re.fullmatch(regexpass, request.json['password'])):
        result = {
            "status": "unsuccessful",
            "email_address": email_address,
            "message": "Invalid Password"
        }
        return jsonify(result), 422
    else:
        password = request.json['password']
        fullname = request.json['fullname']
        user_to_create = Patients(fullname, email_address, password, username)
        db.session.add(user_to_create)
        db.session.commit()
        login_user(user_to_create)
        result = {
            "status": "successful",
            "username": username
        }
        return jsonify(result), 201
 
@app.route("/api/schedule", methods=['GET', 'POST'])
def indexone():
    email = request.json["email"]
    eventlink = createEvent(email)
    msg = Message(
        'Hello',
        sender=('Sid From InCare', 'siddhukanu3@gmail.com'),
        recipients=[email]
    )
    msg.html = render_template('email.html', eventlink=eventlink)
    mail.send(msg)
    flash(f"Meeting link has been sent")
    result = {
        "status": "sent",
        "eventLink": eventlink
    }
    return jsonify(result), 200