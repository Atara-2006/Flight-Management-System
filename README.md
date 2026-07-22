# Flight Management System

A comprehensive, full-stack Flight Management System featuring a Spring Boot backend and a React frontend, equipped with advanced functionalities including an AI-powered Travel Agent and an automated Email Notification system.

## 📌 Project Overview
This project is an advanced Flight Management System designed to handle flights, passenger bookings, waiting lists, and intelligent travel assistance. It demonstrates a multi-layer architecture in the backend and a responsive, modern user interface in the frontend.

## 🚀 Features & Capabilities
- **Flight Management**: Full CRUD operations for managing flights, schedules, and capacities.
- **Booking & Waitlist System**: Robust booking mechanism. If a flight is full, passengers are automatically added to a waiting list.
- **AI Travel Agent**: An integrated AI assistant powered by OpenAI that helps users choose destinations, get travel recommendations, and answers flight-related queries.
- **Automated Email Service**: Backend service that automatically sends booking confirmations and updates to passengers.
- **Exception Handling**: Global exception handling to ensure clear and consistent API error responses.

## 🏗️ Architecture & Technologies

### Backend (Spring Boot)
- Built with Java and Spring Boot.
- **Layered Architecture**:
  - **Controllers**: REST endpoints exposed for frontend consumption (Flights, Bookings, AI, etc.).
  - **Services**: Business logic implementation including waitlist management, OpenAI API integration, and JavaMailSender service.
  - **Repositories**: Data persistence using Spring Data JPA.
  - **Entities & DTOs**: Clean separation of database models and data transfer objects.
- **Database**: Configured with relational database persistence (e.g., H2/MySQL with trace/lock management).

### Frontend (React + Vite)
- Modern SPA (Single Page Application) using React, Vite, and JavaScript.
- **Routing**: `react-router-dom` for seamless navigation between dashboard, bookings, flight search, and the AI Agent.
- **Services**: Axios configurations to handle API requests securely.
- **UI/UX**: Intuitive interface with dedicated components (Flight Cards, Navigation Bar, AI Chat interface).

## 📂 Project Structure
├── project/                  # Spring Boot Backend
│   └── src/                  # Java source files (Controllers, Services, Repos, DTOs, Entities)
└── flight-management-ui/     # React Frontend
├── src/                  # React components, pages, services, assets
└── public/               # Static images and files


## ⚙️ Setup and Installation

### Prerequisites
- Java Development Kit (JDK 17+)
- Node.js & npm
- Maven

### Running the Backend
1. Navigate to the `project` directory.
2. Configure your `application.properties` (Database credentials, OpenAI API key, Email SMTP settings).
3. Run the Spring Boot application:
   ./mvnw spring-boot:run

### Running the Frontend
1. Navigate to the `flight-management-ui` directory.
2. Install dependencies:
   npm install
3. Start the development server:
   npm run dev

## 📜 Documentation & API Usage
- **AI Agent**: Accessible via the AI component/page in the frontend, calling the `/api/ai` endpoint on the backend.
- **Email Notifications**: Triggered automatically upon successful booking creation.
