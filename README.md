🚀 CipherSQLStudio
📘 Browser-Based SQL Learning Platform

CipherSQLStudio is a browser-based SQL practice platform that allows users to solve pre-configured SQL assignments with real-time query execution and LLM-powered intelligent hints.

Unlike traditional database tools, this project focuses on structured SQL learning, where assignments and datasets are pre-defined inside the system.

🌟 Project Overview

CipherSQLStudio provides a guided environment where users can:

Practice SQL queries safely

Execute queries in real time

Receive intelligent conceptual hints

Learn SQL through structured assignments

The system combines React + Express + PostgreSQL + MongoDB + Google Gemini API to deliver an interactive learning experience.

✨ Features
🧩 Core Features
1️⃣ Assignment Listing Page

Displays all available SQL assignments

Shows:

Difficulty level

Title

Description

Allows users to select and attempt assignments

2️⃣ Assignment Attempt Interface

Question panel with requirements

Sample data viewer (schema + preview)

Monaco-based SQL editor

Real-time query execution

LLM-powered intelligent hints

Results panel with formatted output or errors

3️⃣ Query Execution Engine

Executes SQL queries on PostgreSQL sandbox

Allows only SELECT queries

Blocks unsafe commands:

INSERT

UPDATE

DELETE

DROP

ALTER

Returns structured response:

Columns

Rows

Proper validation & error handling

⭐ Optional Features Implemented

User Authentication (Login / Signup)

JWT-based route protection

Track completed assignments per user

🏗️ Architecture Overview

CipherSQLStudio follows a 3-Layer Architecture:

🟦 Frontend (React)

UI rendering

State management

API communication

Displays results & hints

🟩 Backend (Express)

API routing

Middleware handling

SQL query validation

Query execution

Gemini API integration

🟨 Database Layer

MongoDB → Users & Assignments

PostgreSQL → SQL sandbox execution

Gemini API → Contextual hints

🔄 Data Flow (Execute Query)

User clicks Execute Query

Frontend sends request → POST /api/execute-query

JWT middleware validates user

Backend validates SQL query

PostgreSQL executes query

Backend formats results

JSON response sent to frontend

React updates state

Results panel re-renders

🤖 LLM Hint Integration

Powered by Google Gemini API

Prompt Engineering Rules:

Provides conceptual hints only

Prevents full solution leakage

Avoids rewriting complete SQL queries

Backend-controlled integration

Secure API key stored in .env

🛠️ Tech Stack
🎨 Frontend

React.js

SCSS (Vanilla, Mobile-First)

Monaco Editor

⚙️ Backend

Node.js

Express.js

JWT Authentication

🗄️ Database & Services

PostgreSQL

MongoDB (Atlas Compatible)

Google Gemini API

⚙️ Project Setup
1️⃣ Clone Repository
git clone https://github.com/YOUR_USERNAME/CipherSQLStudio.git
cd CipherSQLStudio
2️⃣ Backend Setup
cd backend
npm install

Create a .env file inside backend/ (see Environment Variables below).

Start backend server:

node server.js

Backend runs on:

http://localhost:3000
3️⃣ PostgreSQL Setup

Make sure PostgreSQL is installed and running.

Create sandbox database:

CREATE DATABASE ciphersql_sandbox;

Run seed file:

psql -U postgres -d ciphersql_sandbox -f db/seed.sql
4️⃣ MongoDB Setup

Use MongoDB Atlas or local MongoDB.

Create collections for:

Users

Assignments

Completed Assignments

Add connection string to .env.

5️⃣ Frontend Setup
cd frontend
npm install
npm run dev

Frontend runs on:

http://localhost:5173
🔐 Environment Variables

Create .env inside backend/

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
📌 Security Considerations

Only SELECT queries allowed

SQL injection prevention through validation

JWT-protected routes

API keys secured via environment variables
