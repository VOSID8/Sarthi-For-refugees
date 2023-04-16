
# API for Rehmat

API for project Rehmat, by team Us, for HackOwasp5.




## Tech Stack

**Server:** Django REST framework

**Database:** PostgreSQL



  
## Run Locally


Clone the project


Go to the project directory


We recommend you to use virtual environment

```bash
  python -m venv venv
```

Activate virtual environment   
For Windows PowerShell
```bash
    venv/Scripts/activate.ps1
```
For Linux and MacOS
```bash
    source venv/bin/activate
```

Install dependencies

```bash
  pip install -r requirements.txt
```

Make sure you have installed PostgreSQL

Create *.env file* in base directory and place Secret-Key and Database credentials.

Run Migrations

```
 python manage.py makemigrations
```
```
 python manage.py migrate
```

Start the server

```bash
  python manage.py runserver
```



## API Reference

### Authentication Endpoints

#### Register (for Doctor)

```http
  POST /auth/register/
```
multipart/form-data
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | email id (maximum length: 256) |
| `password` | `string` | password | 
| `name` | `string` | name (maximum length: 256) |
| `phone_number` | `string` | phone number (with country code) | 
| `city` | `string` | city (maximum length: 128) | 
| `country` | `string` | country (maximum length: 128) |
| `role` | `string` | value: DR, for Doctor |
| `date_of_birth` | `string` | User's Date of Birth in format YYYY-MM-DD |
| `id_proof` | `file` | ID Proof Image File |

Returns `HTTP 201 CREATED` status code for succesful execution.

Returns array of `{parameter: [error message 1, error_message 2, ...]}` objects for errors.


#### Card verification (for Refugee)

```http
  POST /auth/verify/
```
multipart/form-data
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id_proof` | `file` | ID Proof Image File |

JSON Response
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `int` | ID for id proof entry |
| `unhrc_number` | `string` | UNHRC Number |

Returns `{'error': 'Some unexpected error occured!'}`, if some unexpected error occured during execution of authentication of script.

Returns `{'error': 'Invalid ID card!'}` for invalid cards.


#### Register (for Refugee)

```http
  POST /auth/register/
```
application/json
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | email id (maximum length: 256) |
| `password` | `string` | password | 
| `name` | `string` | name (maximum length: 256) |
| `phone_number` | `string` | phone number (with country code) |
| `city` | `string` | city (maximum length: 128) | 
| `country` | `string` | country (maximum length: 128) |
| `role` | `string` | value: RF, for refugee |
| `date_of_birth` | `string` | User's Date of Birth in format YYYY-MM-DD |
| `image_id` | `int` | ID for id proof entry |

Returns `HTTP 201 CREATED` status code for succesful execution.

Returns `{'error': 'Email already registered!'}`, if email already registered.


#### Login (for both Doctor and Refugee)

```http
  POST /auth/login/
```
JSON Response
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `token` | `string` | API key |
| `name` | `string` | Name |
| `role` | `string` | DR: Doctor, RF: Refugee |

Returns `{"error": "Invalid Credentials!"}` for invalid login credentials.


#### Get Role of logged-in user

```http
  GET /auth/role/
```
- Authenticated Endpoint

JSON Response
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `role` | `string` | 'refugee': Refugee, 'doctor': Doctor |


### Slot Booking Endpoints

#### Free Slots of Logged In Doctor

```http
  GET /slot/view/available/doctor/
```
JSON Response
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `int` | ID of record |
| `date_str` | `string` | format: YYYY-MM-DD |
| `time_str` | `string` | format: HH:mm |


#### Scheduled Slots of Logged In Doctor

```http
  GET /slot/view/scheduled/doctor/
```
JSON Response
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `int` | ID of record |
| `date_str` | `string` | format: YYYY-MM-DD |
| `time_str` | `string` | format: HH:mm |


#### Scheduled Slots of Logged In Refugee

```http
  GET /slot/view/scheduled/refugee/
```
JSON Response
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `int` | ID of record |
| `date_str` | `string` | format: YYYY-MM-DD |
| `time_str` | `string` | format: HH:mm |


#### Prescriptions given by Logged In Doctor

```http
  GET /slot/view/prescription/doctor/
```
JSON Response
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `int` | ID of record |
| `patient` | `string` | Patient Name |
| `doctor` | `string` | Doctor Name |
| `date_str` | `string` | format: YYYY-MM-DD |
| `time_str` | `string` | format: HH:mm |
| `text` | `string` | Prescription Description |


#### Previous Presecriptions of Logged In Refugee

```http
  GET /slot/view/prescription/refugee/
```
JSON Response
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `int` | ID of record |
| `patient` | `string` | Patient Name |
| `doctor` | `string` | Doctor Name |
| `date_str` | `string` | format: YYYY-MM-DD |
| `time_str` | `string` | format: HH:mm |
| `text` | `string` | Prescription Description |

#### Available Slots for booking (for refugee)

```http
  POST /slot/available-slots/
```
- Authenticated Endpoint
- Only for Refugee

JSON request data
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `date` | `string` | Format: `YYYY-MM-DD` |

JSON Response Array format:
`["HH:MM", "HH:MM", ...]`


#### Add free slot (for Doctor)

```http
  POST /slot/add-free/
```
- Authenticated Endpoint
- Only for Doctors

JSON Request Data
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `date` | `string` | format: YYYY-MM-DD |
| `time` | `Array<string>` | Array of strings of format: `HH:mm` |

Returns `201 CREATED` status code for succesful execution.

Return `{'error': 'You are not authorised to visit this page!'}` and `400 bad request` status code if user is unauthorised.

#### Schedule slot (for Refugee)

```http
  POST /slot/schedule/
```

- Authenticated Endpoint
- Only for Refugee

JSON Request Data
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `date` | `string` | format: YYYY-MM-DD |
| `time` | `string` | format: HH:mm |

Returns `201 CREATED` status code for succesful execution.

Return `400 Bad Request` status code for invalid requests.


#### Previous Presecriptions of Refugee with given slot

```http
  GET /slot/patient-previous-prescriptions/<int:id>/
```
- Here `id` is ID of Scheduled Slot Object, gives all previous prescriptions of the patient with that slot.
- Authenticated Endpoint
- Only for doctors

JSON Response
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `int` | ID of record |
| `patient` | `string` | Patient Name |
| `doctor` | `string` | Doctor Name |
| `date_str` | `string` | format: YYYY-MM-DD |
| `time_str` | `string` | format: HH:mm |
| `text` | `string` | Prescription Description |


#### Cancel Scheduled Slot (for both Doctor and Refugee)

```http
  POST /slot/cancel/
```

- Authenticated Endpoint

JSON Request Data
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `int` | ID of Scheduled Slot Object |

Returns `200 OK` status code for succesful execution.

Return `400 Bad Request` status code for invalid requests.


#### Cancel Free Slot (for Doctor)

```http
  POST /slot/cancel-doctor-free/
```

- Authenticated Endpoint
- Only for Doctors

JSON Request Data
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `int` | ID of Scheduled Slot Object |

Returns `200 OK` status code for succesful execution.

Return `400 Bad Request` status code for invalid requests.


#### Upcoming Slot for Doctor

```http
  GET /slot/doctor-next-slot/
```

- Authenticated Endpoint
- Only for Doctors

JSON Response
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `int` | ID of record |
| `date_str` | `string` | format: YYYY-MM-DD |
| `time_str` | `string` | format: HH:mm |

Returns `204 NO CONTENT` status code if there is no upcoming slot.


#### Slots attended by the Doctor today

```http
  GET /slot/doctor-todays-past-slots/
```

- Authenticated Endpoint
- Only for Doctors

JSON Response
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `count` | `int` | Number of slots attended by Doctor |


#### Agora Meeting Token (for both Doctor and Refugee)

```http
  GET /slot/meeting-token/
```

- Authenticated Endpoint

JSON Response
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `token` | `string` | Meeting Token |
| `channel` | `string` | Meeting Channel Name |
| `uid` | `string` | User's UID for meeting |

