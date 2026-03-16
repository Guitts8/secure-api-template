# Secure API Template

![Node](https://img.shields.io/badge/Node.js-18+-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Express](https://img.shields.io/badge/Express-API-black)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)

Secure API Template is a production-ready authentication API built with **Node.js, TypeScript, Express and Prisma**.

The project demonstrates best practices for building secure REST APIs including authentication, authorization, refresh tokens and role-based access control.

This repository was created as part of a backend portfolio project to showcase modern API architecture.

---

## Features

- User registration
- User login
- JWT authentication
- Refresh token flow
- Logout with token revocation
- Role-based authorization (Admin / User)
- Protected routes
- Prisma ORM
- PostgreSQL database
- Swagger API documentation

---

## Tech Stack

### Backend

- Node.js
- Express
- TypeScript

### Database

- PostgreSQL
- Prisma ORM

### Authentication

- JSON Web Token (JWT)
- Refresh Tokens

### Documentation

- Swagger UI
- Swagger JSDoc

---

## Project Structure

\```text
src
├── config
│   ├── prisma.ts
│   └── swagger.ts
├── controllers
│   └── auth.controller.ts
├── middlewares
│   ├── auth.middleware.ts
│   └── role.middleware.ts
├── repositories
├── routes
│   ├── auth.routes.ts
│   ├── user.routes.ts
│   └── admin.routes.ts
├── services
│   └── auth.service.ts
├── utils
│   ├── hash.ts
│   └── jwt.ts
├── app.ts
└── server.ts
\```

---

## Installation

Clone the repository

\```bash
git clone https://github.com/your-username/secure-api-template.git
\```

Enter the project folder

\```bash
cd secure-api-template
\```

Install dependencies

\```bash
npm install
\```

---

## Environment Variables

Create a `.env` file in the project root.

Example:

\```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/secure_api_template"
JWT_SECRET=supersecretkey
JWT_REFRESH_SECRET=superrefreshsecret
\```

---

## Database Setup

Run the Prisma migrations

\```bash
npx prisma migrate dev
\```

Generate the Prisma client

\```bash
npx prisma generate
\```

You can inspect the database with:

\```bash
npx prisma studio
\```

---

## Running the API

Start the development server

\```bash
npm run dev
\```

The API will run on:

\```text
http://localhost:3000
\```

---

## API Documentation

Swagger documentation is available at:

\```text
http://localhost:3000/docs
\```

The documentation includes:

- Authentication endpoints
- Protected routes
- Request and response schemas
- Interactive API testing

---

## Authentication Flow

Login returns two tokens:

\```text
accessToken
refreshToken
\```

Access tokens are short-lived and used to authenticate requests.

Refresh tokens are stored in the database and can be used to generate new access tokens.

---

## Protected Routes

Some routes require authentication.

Example:

\```http
GET /users/me
\```

Admin-only routes require the `ADMIN` role.

Example:

\```http
GET /admin/dashboard
\```

---

## Example Login Request

\```http
POST /auth/login
\```

Request body

\```json
{
  "email": "user@email.com",
  "password": "123456"
}
\```

Response

\```json
{
  "accessToken": "...",
  "refreshToken": "...",
  "user": {
    "id": "...",
    "name": "User",
    "email": "user@email.com",
    "role": "USER"
  }
}
\```

---

## Future Improvements

- Input validation with Zod
- Global error handling
- Docker support
- Unit and integration tests
- Rate limiting
- Logging

---

## License

MIT
