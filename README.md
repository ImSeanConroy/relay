# Relay: Send. Receive. Connect.

Full-stack messaging application built using the PERN stack (PostgreSQL, Express, React, and Node).

## Getting Started

### Prerequisites
Before getting started, ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

### Installation

The following contains instruction for getting this application running locally:

1. **Clone the repository:**

```bash
git clone https://github.com/imseanconroy/relay.git
cd relay
```

2. **Frontend Setup:**

    1. Navigate to the frontend directory and install dependencies:
    ```bash
    cd frontend
    npm install
    ```

    2. Configure environment variables by creating a .env file in the frontend directory
    ```bash
    NODE=development
    ```

    3. Start the frontend development server:
    ```bash
    npm run dev
    ```

3. **Backend Setup:**

    1. Navigate to the backend directory and install dependencies:
    ```bash
    cd backend
    npm install
    ```

    2. Configure environment variables by creating a .env file in the backend directory:
    ```bash
    DATABASE_URL=
    JWT_SECRET=example-secert
    NODE_ENV=development
    PORT=3000
    ```

    3. Start the backend development server:
    ```bash
    npm run dev
    ```

## Testing

Use the following command to run all tests:
```bash
npm run test
```

## Project Structure

```
relay/
├── frontend/    # React application
├── backend/     # Express.js server and PostgreSQL integration
└── README.md    # Project documentation
```

## Contributing

Contributions are welcome. Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is Distributed under the MIT License - see the [LICENSE](LICENSE) file for information.

## Support

If you are having problems, please let me know by [raising a new issue](https://github.com/ImSeanConroy/relay/issues/new/choose).