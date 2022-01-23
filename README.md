
# In Care (React Flask)
A web application for creating and maintaining Patient Records and Prescriptions for each of the registered patients. The intended users of this app will be Doctors/ Health care providers to manage Electronic Health Records of Patients .
 
## What is the use of this Project

1. Patients can create their accounts
2. Doctor can login to their account and see all Patients Data 
3. Doctor can give prescription and immunisation to Patients.
4. Patients can view their prescription,immunisation and past Problems.
5. Patients can schedule a meeting with Doctor.

## Prerequisites -FRONTEND(REACT)

### Install Node JS
Refer to https://nodejs.org/en/ to install nodejs

### Install create-react-app
Install create-react-app npm package globally. This will help to easily run the project and also build the source files easily. Use the following command to install create-react-app

```bash
npm install -g create-react-app
```
Update Node version

```bash
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt install nodejs
sudo apt-get install -y nodejs
```
Check Node and Npm Version
```bash
node --version
npm --version
```


## Run Locally at localhost:3000

Clone the project

```bash
  git clone https://github.com/PREETGARG14/IN_CARE_REACT_FLASK.git
```

Go to the project directory

```bash
  cd IN_CARE_REACT_FLASK/react_frontend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```


The Application Runs on **localhost:3000**

#### HTTP client

**axios** library is used to make HTTP Calls

## Resources

**create-react-app** : The following link has all the commands that can be used with create-react-app
https://github.com/facebook/create-react-app

**ReactJS** : Refer to https://reactjs.org/ to understand the concepts of ReactJS

**Material Ui** : Refer to https://mui.com/components/material-icons/ to understand how to use Material Ui

**Bootstrap** : Refer to https://getbootstrap.com/ to understand how Bootstrap works.

**CSS** : Refer to https://www.w3schools.com/react/react_css.asp to understand the concepts of Css.
## Tech Stack

**Client:** React, React-router-dom , material ui , Bootstrap , Javascript.

**Server:** Flask
## API Reference For PostMan

The API is designed to return different status codes according to context and
action. This way, if a request results in an error, the caller is able to get
insight into what went wrong.
The following table gives an overview of how the API functions generally behave.

| Request type    |Description                   |
| :--------       |:-------------------------    |
|        `GET`     | Access one or more resources and return the result as JSON.|
|        `POST`     | Return 201 Created if the resource is successfully created and return the newly created resource as JSON.Return 200 OK if the resource is accessed or modified successfully|

The following table shows the possible return codes for API requests.

| Return values    | Description                |
| :--------       | :------------------------- |
| `200 OK`     | The GET, PUT or DELETE request was successful, and the resource(s) itself is returned as JSON.               |
| `204 No Content`      | The server has successfully fulfilled the request, and there is no additional content to send in the response payload body.             |
| `201 Created`      | The POST request was successful, and the resource is returned as JSON.    |
| `304 Not Modified`      |The resource hasn't been modified since the last request.           |
| `400 Bad Request`      |A required attribute of the API request is missing. For example, the title of an issue is not given.        |
| `401 Unauthorized`      |The user isn't authenticated. A valid user token is necessary.  |
| `403 Forbidden`      | The request isn't allowed. For example, the user isn't allowed to delete a project.  |
| `404 Not Found`      | A resource couldn't be accessed. For example, an ID for a resource couldn't be found. |
| `422 Unprocessable`      | The entity couldn't be processed. |
| `500 Server Error`      | While handling the request, something went wrong on the server.   |



#### Post :> User Login

```bash
  POST http://0.0.0.0:5000/api/login
```

| Parameter       | Type     | Description                |
| :--------       | :------- | :------------------------- |
| `username`      | `string` | **Required*.               |
| `password`      | `string` | **Required*.               |

#### Get :> User Logout

```bash
  GET http://0.0.0.0:5000/api/logout/{{pid}}
```

#### Post :> Doctor Login

```bash
  POST http://0.0.0.0:5000/api/doctor
```

| Parameter       | Type     | Description                |
| :--------       | :------- | :------------------------- |
| `email_address` | `string` | **Required*.               |
| `password`      | `string` | **Required*.               |


#### Get :> Doctor Logout

```bash
  GET http://0.0.0.0:5000/api/logoutDoctor/{{doctorId}}
```


#### Post :> User Register

```bash
  POST http://0.0.0.0:5000/api/register
```

| Parameter       | Type     | Description                |
| :--------       | :------- | :------------------------- |
| `fullname`      | `string` | **Required*.               |
| `email_address` | `string` | **Required*.               |
| `password`      | `string` | **Required*.               |
| `username`      | `string` | **Required*.               |

#### GET/Post :> Doctor Fetch/Select Users

```bash
  GET http://0.0.0.0:5000/api/doctor/users
  POST http://0.0.0.0:5000/api/doctor/users
```

| Parameter       | Type     | Description                   |
| :--------       | :------- | :-------------------------    |
|        -        |    -     | **Required*.API Token Required|


#### POST :> Doctor Post Prescription

```bash
  POST http://0.0.0.0:5000/api/doctor/prescribe/{{pid}}
```

| Parameter         | Type     | Description                |
| :--------         | :------- | :------------------------- |
|                   | `string` | *API Token Required        |
| `pi`              | `string` |                            |
| `Medication item` | `string` |                            |
| `71 more in row`  | `string` |                            |


#### GET :> User Fetch Prescription

```bash
  GET http://0.0.0.0:5000/api/prescribe/{{pid}}
```

| Parameter       | Type     | Description                   |
| :--------       | :------- | :-------------------------    |
|        -        |    -     | **Required*.API Token Required|

#### POST :> Doctor Post Past History Of Illness

```bash
  POST http://0.0.0.0:5000/api/doctor/past/{{pid}}
```

| Parameter         | Type     | Description                |
| :--------         | :------- | :------------------------- |
|                   | `string` | **Required*.API Token Required        |
| `problem`         | `string` | **Required*.               |
| `body_site`       | `string` | **Required*.               |
| `dateTime`        | `string` | **Required*.               |
| `severity`        | `string` | **Required*.               |
| `last_updated`        | `string` | **Required*.               |

#### GET :> User Fetch Past History Of Illness

```bash
  GET http://0.0.0.0:5000/api/past/{{pid}}
```

| Parameter       | Type     | Description                   |
| :--------       | :------- | :-------------------------    |
|        -        |    -     | **Required*.API Token Required|


#### POST :> Doctor Post Immunisation

```bash
  POST http://0.0.0.0:5000/api/doctor/immunisation/{{pid}}
```

| Parameter         | Type     | Description                |
| :--------         | :------- | :------------------------- |
|                   | `string` | **Required*.API Token Required        |
| `immunisation_item`         | `string` | **Required*.               |
| `route`       | `string` | **Required*.               |
| `target_site`        | `string` | **Required*.               |
| `sequence_no`        | `string` | **Required*.               |

#### GET :> User Fetch Immunisation

```bash
  GET http://0.0.0.0:5000/api/immunisation/{{pid}}
```

| Parameter       | Type     | Description                   |
| :--------       | :------- | :-------------------------    |
|        -        |    -     | **Required*.API Token Required|


#### GET/Post :> User Schedule Meet with Doctor

```bash
  GET http://0.0.0.0:5000/api/schedule
  POST http://0.0.0.0:5000/api/schedule
```

| Parameter       | Type     | Description                   |
| :--------       | :------- | :-------------------------    |
|    `email`      | `string` | **Required*.                  |


#### GET/Post :> User talk with InCareBot

```bash
  GET http://0.0.0.0:5000/chatbot
  POST http://0.0.0.0:5000/chatbot
```

| Parameter       | Type     | Description                   |
| :--------       | :------- | :-------------------------    |
|   `question`    | `string`    | **Required*.               |







