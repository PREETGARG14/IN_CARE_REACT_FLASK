
# In Care (React Flask)
A web application for creating and maintaining Patient Records and Prescriptions for each of the registered patients. The intended users of this app will be Doctors/ Health care providers to manage Electronic Health Records of Patients .
 



## Documentation

[Documentation](https://linktodocumentation)


## API Reference

#### Post :> User Login

```http
  POST http://0.0.0.0:5000/api/login
```

| Parameter       | Type     | Description                |
| :--------       | :------- | :------------------------- |
| `username`      | `string` | **Required*.               |
| `password`      | `string` | **Required*.               |

#### Get :> User Logout

```http
  GET http://0.0.0.0:5000/api/logout/{{user_id}}
```

#### Post :> Doctor Login

```http
  POST http://0.0.0.0:5000/api/doctor
```

| Parameter       | Type     | Description                |
| :--------       | :------- | :------------------------- |
| `email_address` | `string` | **Required*.               |
| `password`      | `string` | **Required*.               |


#### Get :> Doctor Logout

```http
  GET http://0.0.0.0:5000/api/logoutDoctor/{{user_id}}
```


#### Post :> User Register

```http
  POST http://0.0.0.0:5000/api/register
```

| Parameter       | Type     | Description                |
| :--------       | :------- | :------------------------- |
| `fullname`      | `string` | **Required*.               |
| `email_address` | `string` | **Required*.               |
| `password`      | `string` | **Required*.               |
| `username`      | `string` | **Required*.               |

#### GET/Post :> Doctor Fetch/Select Users

```http
  GET http://0.0.0.0:5000/api/doctor/users
  POST http://0.0.0.0:5000/api/doctor/users
```

| Parameter       | Type     | Description                   |
| :--------       | :------- | :-------------------------    |
|        -        |    -     | **Required*.API Token Required|


#### POST :> Doctor Post Prescription

```http
  POST http://0.0.0.0:5000/api/doctor/prescribe/{{user_id}}
```

| Parameter         | Type     | Description                |
| :--------         | :------- | :------------------------- |
|                   | `string` | *API Token Required        |
| `pi`              | `string` |                            |
| `Medication item` | `string` |                            |
| `71 more in row`  | `string` |                            |


#### GET :> User Fetch Prescription

```http
  GET http://0.0.0.0:5000/api/prescribe/{{pid}}
```

| Parameter       | Type     | Description                   |
| :--------       | :------- | :-------------------------    |
|        -        |    -     | **Required*.API Token Required|

#### POST :> Doctor Post Past History Of Illness

```http
  POST http://0.0.0.0:5000/api/doctor/past/{{page_id}}
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

```http
  GET http://0.0.0.0:5000/api/past/{{page_id}}
```

| Parameter       | Type     | Description                   |
| :--------       | :------- | :-------------------------    |
|        -        |    -     | **Required*.API Token Required|


#### POST :> Doctor Post Immunisation

```http
  POST http://0.0.0.0:5000/api/doctor/immunisation/{{page_id}}
```

| Parameter         | Type     | Description                |
| :--------         | :------- | :------------------------- |
|                   | `string` | **Required*.API Token Required        |
| `immunisation_item`         | `string` | **Required*.               |
| `route`       | `string` | **Required*.               |
| `target_site`        | `string` | **Required*.               |
| `sequence_no`        | `string` | **Required*.               |

#### GET :> User Fetch Immunisation

```http
  GET http://0.0.0.0:5000/api/immunisation/{{page_id}}
```

| Parameter       | Type     | Description                   |
| :--------       | :------- | :-------------------------    |
|        -        |    -     | **Required*.API Token Required|


#### GET/Post :> User Schedule Meet with Doctor

```http
  GET http://0.0.0.0:5000/api/schedule
  POST http://0.0.0.0:5000/api/schedule
```

| Parameter       | Type     | Description                   |
| :--------       | :------- | :-------------------------    |
|    `email`      | `string` | **Required*.                  |


#### GET/Post :> User talk with InCareBot

```http
  GET http://0.0.0.0:5000/chatbot
  POST http://0.0.0.0:5000/chatbot
```

| Parameter       | Type     | Description                   |
| :--------       | :------- | :-------------------------    |
|   `question`    | `string`    | **Required*.               |







