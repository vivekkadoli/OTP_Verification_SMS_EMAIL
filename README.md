# MERN OTP Application

This project is a MERN stack application that implements real-time OTP (One-Time Password) functionality for user registration, login, and password recovery via email and SMS.

## Features

- User Registration: Users can register with their email and phone number.
- User Login: Users can log in using their credentials.
- Forgot Password: Users can request an OTP to reset their password.
- OTP Generation: OTPs are generated and sent via email and SMS for verification.

## Technologies Used

- **MongoDB**: NoSQL database for storing user data.
- **Express.js**: Web framework for Node.js to handle server-side logic.
- **React**: Frontend library for building user interfaces.
- **Node.js**: JavaScript runtime for server-side development.
- **TypeScript**: Superset of JavaScript for type safety and better development experience.

## Project Structure

```
mern-otp-app
├── client                # React frontend
│   ├── src
│   │   ├── components    # React components for registration, login, and password recovery
│   │   ├── App.tsx       # Main application component
│   │   ├── index.tsx     # Entry point for the React application
│   │   └── types         # TypeScript types and interfaces
│   ├── package.json      # Client-side dependencies and scripts
│   └── tsconfig.json     # TypeScript configuration for the client
├── server                # Node.js backend
│   ├── src
│   │   ├── controllers    # Logic for authentication and OTP handling
│   │   ├── models         # Mongoose models for user data
│   │   ├── routes         # API routes for authentication and OTP
│   │   ├── utils          # Utility functions for email and SMS services
│   │   ├── app.ts         # Entry point for the server application
│   │   └── types          # TypeScript types and interfaces for the server
│   ├── package.json       # Server-side dependencies and scripts
│   └── tsconfig.json      # TypeScript configuration for the server
```

## Setup Instructions

### Prerequisites

- Node.js
- MongoDB
- TypeScript

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd mern-otp-app
   ```

2. Install server dependencies:
   ```
   cd server
   npm install
   ```

3. Install client dependencies:
   ```
   cd client
   npm install
   ```

### Running the Application

1. Start the MongoDB server.
2. Start the backend server:
   ```
   cd server
   npm run dev
   ```

3. Start the frontend application:
   ```
   cd client
   npm start
   ```

### Usage

- Navigate to `http://localhost:3000` to access the application.
- Follow the prompts for registration, login, and password recovery.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.