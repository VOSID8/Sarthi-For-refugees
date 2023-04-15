
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
