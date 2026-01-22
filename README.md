# Simple User API

A straightforward RESTful API designed for managing user data, built with a modern Node.js stack.

## Features

-   **User Management:** CRUD operations for users (Create, Read, Update, Delete).
-   **API Documentation:** Interactive API documentation using Swagger UI.
-   **Request Validation:** Robust input validation for API endpoints using `express-validator`.
-   **Centralized Error Handling:** Consistent error responses across the API.
-   **Database ORM:** Powered by Prisma ORM for type-safe database interactions with SQLite.

## Technologies Used

-   **Backend:** Node.js, Express.js
-   **Language:** TypeScript
-   **Database ORM:** Prisma ORM (with `@prisma/adapter-better-sqlite3` for SQLite)
-   **Environment Management:** `dotenv`
-   **Validation:** `express-validator`
-   **API Documentation:** `swagger-jsdoc`, `swagger-ui-express`
-   **Development Tools:** `nodemon` (for auto-restarting server), `ts-node` (for running TypeScript directly)

## Prerequisites

Before you begin, ensure you have the following installed:

-   [Node.js](https://nodejs.org/) (LTS version recommended)
-   [npm](https://www.npmjs.com/) (Node Package Manager, usually comes with Node.js)

## Installation

Follow these steps to set up the project locally:

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd simple-user-api
    ```
    (Replace `<repository-url>` with the actual URL of your repository.)

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of your project and add your database connection string.
    For SQLite, it should look like this:
    ```
    # .env
    DATABASE_URL="file:./dev.db"
    ```

4.  **Generate Prisma Client and Run Migrations:**
    This command will generate the Prisma client based on your `schema.prisma` and apply any pending database migrations.
    ```bash
    npx prisma migrate dev --name init
    ```
    (The `--name init` part can be changed to any descriptive name for your migration.)

## Running the Application

### Development Mode

To run the application in development mode with `nodemon` (which automatically restarts the server on file changes):

```bash
npm run dev
```

The server will be accessible at `http://localhost:3000`.

### Production Mode

To build the TypeScript code into JavaScript and then run the compiled application:

1.  **Build the project:**
    ```bash
    npm run build
    ```

2.  **Start the application:**
    ```bash
    npm start
    ```

The server will be accessible at `http://localhost:3000`.

## API Endpoints

Once the server is running, you can access the interactive API documentation (Swagger UI) at:

[http://localhost:3000/api-docs](http://localhost:3000/api-docs)

This interface allows you to explore the available endpoints, their request/response schemas, and even test them directly.

## Project Structure

```
.
├── .env
├── screenshots
├── .gitignore
├── package.json
├── prisma.config.ts
├── tsconfig.json
├── prisma/
│   ├── schema.prisma
│   └── migrations/
│       └── ... (database migration files)
└── src/
    ├── app.ts
    ├── server.ts
    ├── controllers/
    │   └── user.controller.ts
    ├── middlewares/
    │   ├── errorHandler.ts
    │   └── validation.ts
    ├── repositories/
    │   └── user.repository.ts
    ├── routes/
    │   └── user.routes.ts
    ├── services/
    │   └── user.service.ts
    └── utils/
        ├── prisma.ts        # Prisma Client singleton
        └── swagger.ts       # Swagger configuration
```
## Screenshots
Screenshots of API testing using Swagger UI are available in the screenshots folder.

