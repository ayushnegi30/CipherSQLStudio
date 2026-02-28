📘 CipherSQLStudio

CipherSQLStudio is a browser-based SQL learning platform that allows users to practice SQL queries against pre-configured assignments with real-time execution and intelligent LLM-powered hints.

This project focuses on building a structured SQL practice experience — not a database creation tool. Assignments and sample data are pre-configured and stored in the system.

🚀 Features
✅ Core Features
1️⃣ Assignment Listing Page

Displays all available SQL assignments

Shows difficulty level, title, and description

Allows users to select and attempt assignments

2️⃣ Assignment Attempt Interface

Question panel with assignment requirements

Sample data viewer (schema + preview data)

Monaco-based SQL editor

Real-time query execution

Intelligent hint generation using Google Gemini API

Results panel displaying formatted output or errors

3️⃣ Query Execution Engine

Executes SQL queries against PostgreSQL sandbox database

Allows only SELECT queries

Blocks unsafe SQL commands (INSERT, UPDATE, DELETE, DROP, etc.)

Returns structured results (columns + rows)

Proper error handling and validation

🌟 Optional Features Implemented

User authentication (Login / Signup)

JWT-based route protection

Track completed assignments per user

🏗️ Architecture Overview

The system follows a 3-layer architecture:

🟦 Frontend (React)

Handles UI rendering

Manages application state

Sends API requests

Displays query results and hints

🟩 Backend (Express)

Handles routing and middleware

Performs query validation

Executes SQL queries

Integrates Gemini API for hints

🟨 Database Layer

MongoDB → Stores users and assignments

PostgreSQL → SQL sandbox execution engine

Gemini API → Generates contextual hints

🔄 Data Flow (Execute Query)

User clicks "Execute Query"

Frontend sends POST /api/execute-query

JWT middleware validates user

Backend validates SQL query

PostgreSQL executes query

Backend formats result

JSON response sent to frontend

React updates state

Results panel re-renders

🤖 LLM Hint Integration

Uses Google Gemini API

Prompt engineered to:

Provide conceptual hints only

Prevent full solution leakage

Avoid rewriting full SQL queries

Backend-controlled API integration

Secure API key stored in .env

🛠️ Tech Stack
Frontend

React.js

SCSS (Vanilla, mobile-first approach)

Monaco Editor

Backend

Node.js

Express.js

JWT Authentication

PostgreSQL

MongoDB (Atlas compatible)

Google Gemini API

⚙️ Project Setup Instructions
1️⃣ Clone the Repository
git clone https://github.com/YOUR_USERNAME/CipherSQLStudio.git
cd CipherSQLStudio
2️⃣ Backend Setup
cd backend
npm install

Create a .env file in the backend folder (see Environment Variables section below).

Start the backend server:

node server.js

Backend will run on:

http://localhost:3000
3️⃣ PostgreSQL Setup

Make sure PostgreSQL is installed and running.

Create the sandbox database:

CREATE DATABASE ciphersql_sandbox;

Run the seed file to insert sample tables and data:

psql -U postgres -d ciphersql_sandbox -f db/seed.sql
4️⃣ MongoDB Setup

Use MongoDB Atlas or local MongoDB.

Create a database for:

Users

Assignments

Completed assignments tracking

Copy the connection string into your .env.

5️⃣ Frontend Setup
cd frontend
npm install
npm run dev

Frontend runs on:

http://localhost:5173
🔐 Environment Variables Needed

Create a .env file inside the backend directory.

Example:

PORT=3000

# MongoDB
MONGO_URI=mongodb+srv://your_mongo_connection_string

# PostgreSQL
POSTGRES_HOST=localhost
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_password
POSTGRES_DB=ciphersql_sandbox
POSTGRES_PORT=5432

# JWT Authentication
JWT_SECRET=your_jwt_secret_key

# LLM Integration
GEMINI_API_KEY=your_gemini_api_key
