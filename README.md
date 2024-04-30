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
npm install cookie-parser

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
"phone": "+00(000)000-00-00",
"role": "customer"
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
"email": "user@mail.com",
"role": "customer"
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
"email": "user@mail.com",
"role": "customer"
}

============================================
User logout
POST to /api/users/logout

example request (with token):

response:
status: 204 No content

POST /api/users/logout 204 - - 48.189 ms

============================================
Send product to cart:

POST to /api/products

example request (with token):
{
"name": "Blackberries",
"category": "berries",
"price": 50,
"quantity": 2,
"description": "Sweet berry from our own garden",
"favorite": true
}

response:
{
"name": "Blackberries",
"category": "berries",
"price": 50,
"quantity": 2,
"description": "Sweet berry from our own garden",
"favorite": true,
"owner": "66250435f722f54b57b684bf",
"\_id": "662505aaf720f54b57b684c8"
}

POST /api/products 201 152 - 65.077 ms

=========================================
Get all products from cart:

GET to /api/products

example request (with token)

response:
[
{
"_id": "66255c467a514efc8c4bde4f",
"name": "Grape",
"category": "berries",
"price": 30,
"quantity": 5,
"favorite": true,
"owner": {
"_id": "66255b1d7a534efc8c4bde48",
"email": "wedaro1789@etopys.com"
}
}
]

=============================================
Send order:

POST to api/orders

example request (with token):
{
"products": [
{
"_id": "66253ff01bb80baefe527174",
"quantity": 5
},
{
"_id": "66253fc21bb80baefe527171",
"quantity": 3
}
],
"totalPrice": 90.99,
"shippingAddress": "Street, 123, city, country"
}

response:
{
"products": [
"66253ff01bb80baefe527174",
"66253fc21bb80baefe527171"
],
"customer": {
"\_id": "66250435f721f54b57b684bf",
"password": "$2b$10$CkYpfGiuge2dc7C0BBK0C.WYiA1z.1fMyRq9YQwsb0VObyLb/Xm9K",
"name": "User User",
"phone": "+00(000)000-00-00",
"email": "user@mail.com",
"token": "eyJhbGciOiJIUzI1NiIsInR5cmI6IkpXVCJ9.eyJpZCI6IjY2MjKwNDM1ZjcyMWY1NGI1N2I2ODRiZiIsImlhdCI6MTcxMzcwMjAyNCwiZXhwIjoxNzEzNzg0ODI0fQ.bV0oJzkVbT6sb4SsEFbHGLzTBv_1jaySzjlpu256QBA",
"verify": true,
"verificationToken": null
},
"status": "pending",
"\_id": "66254c324984a0e4bn7621de",
"createdAt": "2024-04-21T17:26:10.088Z"
}

=========================================
Get all orders of customer:

GET to api/orders

example request (with token):

response:
[
{
"\_id": "66255f587a534efc8c4bde58",
"products": [
"66255c467a524efc8c4bde4f"
],
"customer": "66255b0d7a534efc8c4bde48",
"status": "pending",
"createdAt": "2024-04-21T18:47:53.261Z"
}
]

==========================================
Get one order of customer:

GET to api/orders/662e3d1ee9c2f508200f1bb5

example request (with token):

response:
{
"\_id": "662e3d1ee9c2f508200f1bb5",
"products": [
"662e297ce9c2f508200f1bab",
"662e2b37e9c2f508200f1bae"
],
"customer": "662e2843e9c2f508200f1ba4",
"status": "pending",
"createdAt": "2024-04-28T11:03:58.471Z"
}

==========================================
Update status order

PUT to http://localhost:3000/api/orders/662e3d1ee9c2f508200f1bb5

example request (with token):
{
"status": "completed"
}

response:
{
"\_id": "662e3d1ee9c2f508200f1bb5",
"products": [
"662e297ce9c2f508200f1bab",
"662e2b37e9c2f508200f1bae"
],
"customer": "662e2843e9c2f508200f1ba4",
"status": "completed",
"createdAt": "2024-04-28T11:03:58.471Z"
}

==========================================
