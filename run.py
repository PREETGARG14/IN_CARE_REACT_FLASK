# importing libraries
from flask import Flask, redirect, url_for, render_template, request, flash
from flask_mail import Mail, Message
import datetime
import os.path

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
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
    SCOPES = ['https://www.googleapis.com/auth/calendar']

    creds = None
    # The file token.json stores the user's access and refresh tokens, and is
    # created automatically when the authorization flow completes for the first
    # time.
    if os.path.exists('token.json'):
        creds = Credentials.from_authorized_user_file('token.json', SCOPES)
    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                'credentials.json', SCOPES)
            creds = flow.run_local_server(port=8080)
        # Save the credentials for the next run
        with open('token.json', 'w') as token:
            token.write(creds.to_json())

    
    service = build('calendar', 'v3', credentials=creds)    
    body = {
      "calendarId": "primary",
      "conferenceDataVersion": 1,
      "end": {
        'dateTime': '2022-1-21T17:00:00-07:00',
        'timeZone': 'Asia/Kolkata'
      },
      "start": {
        'dateTime': '2022-1-21T09:00:00-07:00',
        'timeZone': 'Asia/Kolkata'
      },
      "conferenceData": {
        "createRequest": {
          "conferenceSolutionKey": {
            "type": "hangoutsMeet"
          },
          "requestId": "RandomString"
        }
      },
      'attendees': [
    {'email': 'siddhukanu1@gmail.com'},
    
  ],
      "summary": "Appointment has been booked"
      }
    event = service.events().insert(calendarId='primary', body=body).execute()
    print('Event created: %s' % (event.get('htmlLink')))
    eventlink = event.get('htmlLink')
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
