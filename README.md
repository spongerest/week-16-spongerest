# My Express App

This is a sample Express.js application that demonstrates user authentication and permissions using MongoDB and JWT.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed.
- MongoDB database with connection URL set in a .env file.
- Necessary packages installed using `npm install`.

## Installation

1. Clone this repository
2. Create a .env file in the project root with your MongoDB connection URL
3. Install dependencies
4. Run the application

The application will run on https://delightful-red-cap.cyclic.app

## Routes
-  GET /: Home route.
-  POST /login: User login route.
-  POST /user: Create a new user.
-  GET /user: Get user information (requires authentication).
-  POST /post: Create a new post (requires authentication).
-  POST /requestreset: Request a password reset.
-  POST /reset: Reset a password.
-  POST /detachPerm: Detach a permission from a user (requires authentication).
-  POST /attachperm: Attach a permission to a user (requires authentication).
-  POST /refresh: Refresh the JWT token.
-  POST /login_session: User login with sessions.
-  POST /logout_session: User logout with sessions.
-  GET /adminuser: Get admin user information (requires superuser permission).

##  Author
# Restu Windri Pangestu
