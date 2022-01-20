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
 
