# importing libraries
from flask import Flask, redirect, url_for, render_template, request, flash
from flask_mail import Mail, Message
import datetime
import os.path
from create_event import createEvent
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

from create_event import createEvent
app = Flask(__name__)
mail = Mail(app) # instantiate the mail class

# configuration of mail
app.config['MAIL_SERVER']='smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = 'siddhukanu3@gmail.com'
app.config['MAIL_PASSWORD'] = 'Sidd@2476'
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
mail = Mail(app)

# message object mapped to a particular URL ‘/’
@app.route("/schedule")
def index():
    eventlink = createEvent()
    msg = Message(
				'Hello',
				sender =('Sid From InCare','siddhukanu3@gmail.com'),
				recipients = ['siddhukanu1@gmail.com']
			)
    msg.html = render_template('email.html' , eventlink = eventlink)
    mail.send(msg)
    return 'Sent'

if __name__ == '__main__':
    app.run(debug = True)
