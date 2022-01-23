from __future__ import print_function

import datetime
import os.path
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from market import db
from market.CreateMeet.zoomlink import createMeeting

# If modifying these scopes, delete the file token.json.
SCOPES = ['https://www.googleapis.com/auth/calendar']


def createEvent(email):
    """Shows basic usage of the Google Calendar API.
    Prints the start and name of the next 10 events on the user's calendar.
    """
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
                'market/credentials.json', SCOPES)
            creds = flow.run_local_server(port=8080)
        # Save the credentials for the next run
        with open('token.json', 'w') as token:
            token.write(creds.to_json())

    zoomlink = createMeeting()
    service = build('calendar', 'v3', credentials=creds)    

#     event = {
#   'summary': 'Google I/O 2015',
#   'location': '800 Howard St., San Francisco, CA 94103',
#   'description': 'A chance to hear more about Google\'s developer products.',
#   'start': {
#     'date': '2021-01-13',
#     'timeZone': 'Asia/Kolkata',
#   },
#   'end': {
#     'date': '2021-01-14',
#     'timeZone': 'Asia/Kolkata',
#   },
#   'recurrence': [
#     'RRULE:FREQ=DAILY;COUNT=2'
#   ],
#   'attendees': [
#     {'email': 'siddhukanu1@gmail.com'},
#     {'email': 'siddhukanu3@gmail.com'},
#   ],
#   'reminders': {
#     'useDefault': False,
#     'overrides': [
#       {'method': 'email', 'minutes': 24 * 60},
#       {'method': 'popup', 'minutes': 10},
#     ],
#   },
# }
    

    body = {
      "calendarId": "primary",
      "conferenceDataVersion": 1,
      'description': zoomlink,
      "end": {
        'dateTime': '2022-1-20T17:00:00-07:00',
        'timeZone': 'Asia/Kolkata'
      },
      "start": {
        'dateTime': '2022-1-20T09:00:00-07:00',
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
    {'email': email},
    {'email': 'siddhukanu3@gmail.com'},
  ],
      "summary": "Appointment has been booked"
      }
    event = service.events().insert(calendarId='primary', body=body).execute()
    print('Event created: %s' % (event.get('htmlLink')))
    eventlink = event.get('htmlLink')
    return eventlink
