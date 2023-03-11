Express API with Firestore
==========================

This is a simple Express API that uses Firestore to retrieve user data and update their online status. The API has two endpoints: one for retrieving all online users and another for logging out a user.

Prerequisites
-------------

-   Node.js version 12.x or later
-   A Firebase project with Firestore enabled
-   A `key.json` file containing your Firebase service account credentials

Installation
------------

1.  Clone this repository
2.  Install dependencies: `npm install`

Configuration
-------------

1.  Create a Firebase project and enable Firestore
2.  Generate a new private key for your service account and download the JSON file
3.  Rename the JSON file to `key.json` and place it in the root of the project directory
4.  Open `.env.example` and update the `PROJECT_ID` and `DATABASE_URL` values with your Firebase project ID and Firestore URL respectively
5.  Rename `.env.example` to `.env`

Usage
-----

To start the server, run:

sql

```
npm start
```

The server will listen on `http://0.0.0.0:8080`.

### API Endpoints

#### `GET /allUsers`

This endpoint retrieves a list of all online users.

Example response body:

json

```
{
  "message": "Users found",
  "success": true,
  "data": [
    "user1@example.com",
    "user2@example.com",
    "user3@example.com"
  ]
}
```

#### `PUT /logout`

This endpoint logs out a user by updating their online status to "offline" in Firestore. It expects a JSON payload with the user's username.

Example request body:

json

```
{
  "username": "user@example.com"
}
```

Example response body (success):

json

```
{
  "message": "Logged out!",
  "success": true
}
```

Example response body (failure):

json

```
{
  "message": "Bad Request",
  "success": false
}
```

### Dependencies

-   `express` - Web framework for Node.js
-   `cors` - Middleware for handling Cross-Origin Resource Sharing (CORS)
-   `firebase-admin` - Firebase Admin SDK for Node.js
-   `dotenv` - Library for loading environment variables from a .env file

License
-------

This project is licensed under the [MIT License](https://chat.openai.com/LICENSE).