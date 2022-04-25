# test-code
Test code for job

## Commands
Running locally:
```bash
nodemon
```

Linting:
```bash
npx eslint --init
```

Set the environment variables:
```bash
NODE_ENV=development
PORT=
MONGODB=mongodb+srv://user:user@cluster0.wbnuo.mongodb.net/test-code?authSource=MONGODB&authMechanism=SCRAM-SHA-1
SECRET_KEY=rama2000
```

Account admin:
```bash
email: 'admin@gmail.com'
password: 'admin'

email: 'adminrama@gmail.com'
password: 'rama2000'
```

Account user:
```bash
email: 'user@gmail.com'
password: 'user'
```

# API

## AUTH
## Register

Api for register:
```bash
POST => /v1/auth/register
```

Body:
```bash
{
  "firstName": "Wahyu",
  "lastName": "Ramadan",
  "email": "wramadan1203@gmail.com",
  "password": "rama2000"
}
```

## Login

Api for Login:
```bash
POST => /v1/auth/login
```

Body:
```bash
{
  "email": "adminrama@gmail.com",
  "password": "rama2000"
}
```

## Api for User
## Get own account

Api for get own account:
```bash
GET => /v1/user
```

## Update own account

Api for update own account:
```bash
PATCH => /v1/user
```

Body:
```bash
{
  "firstName": "First name",
  "lastName": "Last name",
  "email": "Email",
  "password": "Password",
  "phoneNumber": "Phone number",
  "detail": {
      "address": "Address",
      "religion": "Religion", // Default islam
      "birthdate": "Birthdate",
    },
  ),
},
```

## Delete own account

Api for delete own account:
```bash
DELETE => /v1/user
```

## Api for admin

## Create account

Api for create account:
```bash
POST => /v1/admin
```

Body:
```bash
{
  "firstName": "FirstName",
  "lastName": "LastName",
  "email": "Email",
  "password": "Password",
  "phoneNumber": "PhoneNumber",
  "detail": {
      "address": "Address", // Default null
      "religion": "Religion", // Default islam
      "birthdate": "Birthdate", // Default null
      "role": "Role", // Default user
    },
  ),
},
```

## Get all account

Api for get account by Id:
```bash
GET => /v1/admin
```

## Api for get account by Id

Api for get account by Id:
```bash
GET => /v1/admin/:id
```

## Api for update account by Id

Api for update account by Id:
```bash
PATCH => /v1/admin/:id
```

Body:
```bash
{
  "firstName": "FirstName",
  "lastName": "LastName",
  "email": "Email",
  "password": "Password",
  "phoneNumber": "PhoneNumber",
  "detail": {
      "address": "Address", // Default null
      "religion": "Religion", // Default islam
      "birthdate": "Birthdate", // Default null
      "role": "Role", // Default user
    },
  ),
},
```

## Delete account by Id

Api for delete account by Id:
```bash
DELETE => /v1/admin/:id
```
