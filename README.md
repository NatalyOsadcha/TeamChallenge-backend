# TeamChallenge-backend

Dependencies installation commands:
npm i bcrypt
npm i cors
npm install dotenv
npm i express
npm i joi
npm i mongoose
npm install morgan
npm i nanoid

DevDependencies installation commands:
npm i nodemon

start server commands:
npm start
npx nodemon server.js

============================================

User registration:
POST to: /api/users/register

example request:
{
"name": "User User",
"email": "user@gmail.com",
"password": "userpass"
}

response:
{
"user": {
"name": "User User",
"email": "user@gmail.com"
}
}

POST /api/users/register 201 54 - 211.746 ms
