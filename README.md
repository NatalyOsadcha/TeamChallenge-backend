# TeamChallenge-backend

Dependencies installation commands:
npm i bcrypt
npm i cors
npm install dotenv
npm i express
npm i joi
npm install jsonwebtoken
npm i mongoose
npm install morgan
npm i nanoid
npm i @sendgrid/mail

DevDependencies installation commands:
npm i nodemon

start server commands:
npm start
npx nodemon server.js

============================================

User registration & verification:
POST to: /api/users/register

example request:
{
"name": "User User",
"email": "user@mail.com",
"phone": "+00(000)000-00-00",
"password": "userpass"
}

response:
{
"user": {
"name": "User User",
"email": "user@mail.com",
"phone": "+00(000)000-00-00"
}
}

POST /api/users/register 201 54 - 211.746 ms

============================================

User login:
POST to: /api/users/login

example request:
{
"email": "user@mail.com",
"password": "userpass"
}

response:
{
"token": "eyJhbGciOiJIUzI1NiIsInJ5cCI6IkpXVCJ9.eyJpZCI6IjY2MWQ3MWVkMmY0NDViZTQzNThiNzkzOSIsImlhnCI6MTcxMzIwNjg4NywiZXhwIjoxNzEzMjg5Njg3fQ.v6kScJqqXj-J2_kYWZUJGOeWqQbuAkovbth7wCjHMuA",
"user": {
"email": "user@mail.com"
}
}

POST /api/users/login 200 219 - 475.202 ms

============================================

User current:
GET to: /api/users/current

example request (with token):
{
"email": "user@mail.com",
"password": "userpass"
}

response:
{
"name": "User User",
"email": "user@mail.com"
}
