import jwt
import requests
import json
from time import time
  
  
# Enter your API key and your API secret
API_KEY = 'V9S4oiEUQ4yxYyG4N4Tf_A'
API_SEC = 'OEiQLQit4CmMYRT41gE8t43YrpVvzZ2uXgri'

# create json data for post requests
meetingdetails = {"topic": "The title of your zoom meeting",
                  "type": 2,
                  "start_time": "2022-1-20T09:00:00-07:00",
                  "duration": "45",
                  "timezone": "Asia/Kolkata",
                  "agenda": "test",
  
                  "recurrence": {"type": 1,
                                 "repeat_interval": 1
                                 },
                  "settings": {"host_video": "true",
                               "participant_video": "true",
                               "join_before_host": "False",
                               "mute_upon_entry": "False",
                               "watermark": "true",
                               "audio": "voip",
                               "auto_recording": "cloud"
                               }
                  }
  
# send a request with headers including 
# a token and meeting details
def createMeeting():
    headers = {'authorization': 'Bearer %s' % 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6IlY5UzRvaUVVUTR5eFl5RzRONFRmX0EiLCJleHAiOjE2NDI5MjY0MTYsImlhdCI6MTY0MjMyMTYxNn0.k4ctz2GhPDP_gZIDAEAdwVCICr97EDNZtn3vt44O4co',
               'content-type': 'application/json'}
    r = requests.post(
        f'https://api.zoom.us/v2/users/me/meetings', 
      headers=headers, data=json.dumps(meetingdetails))
  
    print("\n creating zoom meeting ... \n")
    # print(r.text)
    # converting the output into json and extracting the details
    y = json.loads(r.text)
    join_URL = y["join_url"]
    meetingPassword = y["password"]
  
    return join_URL
  
  
# run the create meeting function
