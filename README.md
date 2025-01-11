# Relay: Send. Receive. Connect.

Full-stack messaging application built using the PERN stack (PostgreSQL, Express, React, and Node).

![Project Colors Demo](.github/test.gif)

## Table of Contents

- [Getting Started](#getting-started)
- [Development and Testing](#development-and-testing)
- [Development Plan and Improvements](#development-plan-and-improvements)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Support](#support)

## Getting Started

### Prerequisites
Before getting started, ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

### Installation

Follow these steps to set up the application locally:

1. **Clone the repository**:

```bash
git clone https://github.com/imseanconroy/relay.git
cd relay
```

2. **Frontend Setup**:

   1. **Install Dependencies**: Navigate to the `frontend` directory and install required dependencies:
   ```bash
      cd frontend
      npm install
   ```

   2. **Configure Environment Variables**: Create a `.env` file in the frontend directory with the following content:
   ```env
      NODE_ENV=development
   ```

   3. **Start Frontend Development Server**: Run the following command to start the frontend development server:
   ```bash
      npm run dev
   ```

3. **Database Setup**:

   1. **Install Backend Dependencies**: Navigate to the `backend` directory and install the required dependencies:
   ```bash
      cd backend
      npm install
   ```

   2. **Configure Environment Variables**: Create a `.env` file in the `backend` directory with the following content:
   ```env
      PGADMIN_DEFAULT_EMAIL=<pg_admin_email>
      PGADMIN_DEFAULT_PASSWORD=<pg_admin_password>

      POSTGRES_PASSWORD=<database_password>
      POSTGRES_USER=<database_user>
      POSTGRES_DB=<database_name>
      POSTGRES_PORT=5432
      POSTGRES_HOST=localhost
   ```

   3. **Start Docker Container**: Run the following command to start the Docker container:
    ```env
    docker compose up -d
    ```
   
   4. **Access PGAdmin**: Open your browser and go to `localhost:5050` to log in to PGAdmin using the credentials defined in the .env file. Once logged in, connect to PostgreSQL and create a database matching the name defined in `{POSTGRES_DB}`.
   
   5. **Run Database Migrations**: Use PG-migrate to set up the database tables by running:
   ```
   DATABASE_URL=postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB} npm run migrate:up
   ```

4. **Backend Setup:**

   1. **Install Backend Dependencies**: Navigate to the `backend` directory and install the required dependencies:
   ```bash
      cd backend
      npm install
   ```

   2. **Configure Environment Variables**: Open the `.env` file in the `backend` directory and ensure the database environment variables are not deleted. Add the following variables:
   ```env
      NODE_ENV=development
      JWT_SECRET=<your_jwt_secret>
      PORT=3000
   ```

   3. **Start Backend Development Server**: Run the following command to start the backend development server:
   ```bash
      npm run dev
   ```

## Development and Testing

Run all tests with the following command:
```bash
npm run test
```

## Development Plan and Improvements

This section outlines upcoming features and improvements:

1. **User Features:**
   - **Integrate email validation and forgotten password functionality.**
   - Add functionality to update and delete messages.
   - Enable replying to messages and creating message threads.
   - Improve search functionality with optimized API calls and enhanced UI.
   - Implement avatars customization and image uploads.

2. **UI/UX Enhancements:**
   - Redesign the chat interface for better usability, particularly on mobile devices.
   - Integrate animations and transitions to enhance user interaction.

3. **Testing and Quality Assurance:**
   - **Expand test coverage for both frontend and backend components.**
   - Automate integration tests using CI/CD pipelines for streamlined deployment.
   - Introduce comprehensive logging for error tracking and debugging.

4. **Documentation:**
   - Create a detailed API reference.

Feel free to suggest additional improvements by [opening an issue](https://github.com/ImSeanConroy/relay/issues/new/choose).

## Project Structure

```
relay/
├── frontend/                  # React application for the user interface
├── backend/                   # Express.js server with PostgreSQL integration
|   ├── migrations/            # Database migration files
|   ├── src/                   # Backend source code
|       ├── config/            # Database and environment configurations
│       ├── controllers/       # API request handlers
│       ├── middleware/        # Request processing logic (e.g., auth, logging)
│       ├── repositories/      # Database queries and schema models
│       ├── routes/            # API endpoint definitions
│       ├── services/          # Core business logic
│       ├── socket/            # Real-time WebSocket handling
│       ├── util/              # Utility functions (e.g., validation, logging)
└── README.md                  # Project documentation
```

## Contributing

Contributions are welcome. Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is Distributed under the MIT License - see the [LICENSE](LICENSE) file for information.

## Support

If you are having problems, please let me know by [raising a new issue](https://github.com/ImSeanConroy/relay/issues/new/choose).
