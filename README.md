# Secure API Template

[![Node.js](https://img.shields.io/badge/node.js-18+-339933?logo=node.js\&logoColor=white)]()
[![TypeScript](https://img.shields.io/badge/typescript-5+-3178C6?logo=typescript\&logoColor=white)]()
[![Express](https://img.shields.io/badge/express-4.x-000000?logo=express\&logoColor=white)]()
[![PostgreSQL](https://img.shields.io/badge/postgresql-14+-4169E1?logo=postgresql\&logoColor=white)]()
[![Prisma](https://img.shields.io/badge/prisma-ORM-2D3748?logo=prisma\&logoColor=white)]()
[![JWT](https://img.shields.io/badge/authentication-JWT-black)]()
[![License](https://img.shields.io/badge/license-MIT-lightgrey)]()

A production-ready authentication API built with **Node.js**, **TypeScript**, **Express**, **Prisma ORM**, and **PostgreSQL**.

This project demonstrates a secure backend architecture including authentication, role-based authorization, and a scalable modular structure suitable for real-world applications.

---

## Overview

This repository provides a backend template focused on authentication and user management.
It is designed to demonstrate modern backend practices such as:

* secure password handling
* JWT authentication
* clean service architecture
* database integration with Prisma ORM
* modular and maintainable code organization

The goal of this project is to serve both as a **learning resource** and as a **production-ready starting point** for secure APIs.

---

## Technology Stack

| Technology | Purpose                                    |
| ---------- | ------------------------------------------ |
| Node.js    | Runtime environment                        |
| TypeScript | Static typing and improved maintainability |
| Express    | HTTP server and routing                    |
| PostgreSQL | Relational database                        |
| Prisma ORM | Database access layer                      |
| JWT        | Authentication mechanism                   |
| bcrypt     | Password hashing                           |
| dotenv     | Environment variable management            |

---

## Project Structure

```text
secure-api-template
│
├── prisma
│   └── schema.prisma
│
├── src
│   ├── config
│   │   └── prisma.ts
│   │
│   ├── controllers
│   │   └── auth.controller.ts
│   │
│   ├── services
│   │   └── auth.service.ts
│   │
│   ├── routes
│   │   └── auth.routes.ts
│   │
│   ├── utils
│   │   ├── hash.ts
│   │   └── jwt.ts
│   │
│   ├── app.ts
│   └── server.ts
│
├── .env
├── package.json
└── tsconfig.json
```

---

## Installation

Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/secure-api-template.git
cd secure-api-template
```

Install dependencies:

```bash
npm install
```

---

## Environment Configuration

Create a `.env` file in the project root.

Example configuration:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/secure_api_template"
JWT_SECRET="your_secret_key"
JWT_REFRESH_SECRET="your_refresh_secret"
PORT=3000
```

---

## Database Setup

Apply Prisma migrations:

```bash
npx prisma migrate dev --name init
```

Generate the Prisma Client:

```bash
npx prisma generate
```

Optional: open Prisma Studio for database inspection.

```bash
npx prisma studio
```

---

## Running the Application

Start the development server:

```bash
npm run dev
```

The API will be available at:

```
http://localhost:3000
```

---

## API Endpoints

### Register

```
POST /auth/register
```

Example request body:

```json
{
  "name": "John Doe",
  "email": "john@email.com",
  "password": "123456"
}
```

---

### Login

```
POST /auth/login
```

Example request body:

```json
{
  "email": "john@email.com",
  "password": "123456"
}
```

Example response:

```json
{
  "token": "JWT_TOKEN",
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@email.com",
    "role": "USER"
  }
}
```

---

## Authentication

Protected endpoints require a JWT token in the request header:

```
Authorization: Bearer YOUR_TOKEN
```

---

## Future Improvements

* refresh token support
* role-based authorization middleware
* request validation
* global error handling
* API documentation with Swagger
* containerization with Docker
* automated testing

---

## License

This project is licensed under the MIT License.
