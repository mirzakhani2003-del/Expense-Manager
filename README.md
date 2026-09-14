# Expense Manager 💰

A modern personal expense management application built with React that helps users track income, expenses, categories, wallets, and recurring payments in a simple and organized way.

The application allows users to manage their personal finances by creating transactions, organizing them with categories and wallets, setting recurring payment reminders, receiving notifications for due payments, and analyzing their financial data through an interactive dashboard.

## ✨ Features

### 🔐 Authentication & User Management

- User registration and login
- Protected routes
- User-specific data management
- Persistent authentication using Local Storage
- Each user's transactions, categories, wallets, and reminders are isolated

### 💳 Transaction Management

- Add, edit, and delete transactions
- Support for income and expense transactions
- Assign transactions to categories
- Assign transactions to specific wallets
- Search and filter transactions
- Filter by:
  - Transaction type
  - Category
  - Wallet
  - Date range

### 👛 Wallet Management

- Create multiple wallets
- Edit wallet information
- Delete wallets
- Prevent deleting wallets that contain transactions
- Track wallet balance based on transaction history
- Transfer money between wallets
- Prevent spending more than the available wallet balance
- Automatically update wallet balances based on transactions

### 🏷️ Categories

- Create custom categories
- Manage user-specific categories
- Organize transactions by category
- Use categories for financial analytics

### 🔔 Recurring Payment Reminders

- Create recurring payment reminders
- Support weekly and monthly payment frequencies
- Set payment amount
- Assign reminders to categories and wallets
- Set the next payment date
- Edit and delete reminders
- Mark recurring payments as paid
- Automatically create an expense transaction when a reminder is paid
- Automatically calculate the next payment date
- Prevent payments when the selected wallet has insufficient funds

### 🔔 Notifications

- Notification badge in the application header
- Display important payment reminders
- Show overdue payments
- Show payments due today
- Quickly review upcoming payment obligations

### 📊 Dashboard & Analytics

- Financial overview dashboard
- Total balance calculation
- Total income
- Total expenses
- Savings rate
- Expense distribution by category
- Income and expense trends over time
- Wallet overview
- Upcoming payments
- Quick access to important financial information

## 📈 Financial Analytics

The dashboard provides visual insights into the user's financial activity.

### Expense Distribution

Displays how expenses are distributed across different categories.

### Income & Expense Trends

Displays income and expense changes over time.

### Wallet Overview

Shows the current balance of each wallet based on its transaction history.

### Upcoming Payments

Displays the next upcoming recurring payments to help users keep track of future financial obligations.

Transfers between wallets are excluded from income and expense reports because they represent money movement between the user's own wallets rather than actual income or expenses.

## 🛠️ Technologies

### Frontend

- React
- Vite
- JavaScript (ES6+)
- React Router
- Redux Toolkit
- Material UI (MUI)
- Recharts

### State Management

- Redux Toolkit
- Redux slices
- Local Storage persistence
- User-specific application state

### Data Persistence

The application currently uses browser Local Storage to persist:

- Users
- Current authenticated user
- Transactions
- Categories
- Wallets
- Reminders

### Development Tools

- Git
- GitHub
- npm

## 🏗️ Architecture

The application uses a component-based React architecture combined with Redux Toolkit for centralized state management.

### Redux State

Application data is separated into independent Redux slices, including:

- Authentication
- Transactions
- Categories
- Wallets
- Reminders

Components access and update application state using Redux hooks such as `useSelector` and `useDispatch`.

### Routing

React Router is used to provide protected application routes and separate pages for different parts of the application.

Main sections include:

- Dashboard
- Transactions
- Categories
- Wallets
- Reminders

## 🚀 Getting Started

### Clone the repository

```bash
git clone https://github.com/mirzakhani2003-del/Expense-Manager.git
```

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

## 💡 Main Concepts Practiced

This project was built to practice and demonstrate:

- React component architecture
- Redux Toolkit and centralized state management
- Redux slices and actions
- React Router navigation
- Protected routes
- User-specific application data
- Form handling and validation
- Local Storage persistence
- CRUD operations
- Financial calculations
- Wallet balance management
- Money transfers
- Recurring payment logic
- Notification logic
- Data visualization with Recharts
- Reusable components
- Responsive UI design
- Git and GitHub workflow

## 📌 Future Improvements

Possible future improvements include:

- Backend API integration with ASP.NET Core
- RESTful API development
- Database integration
- JWT authentication
- Cloud data synchronization
- Export transactions as CSV
- Import transactions from CSV
- Multiple currencies
- Advanced financial reports
- Improved notification system
- Email notifications
- Mobile-friendly improvements
- Automated testing

## 🎯 Project Goal

This project is part of my full-stack web development learning journey.

The current version focuses on building a modern React frontend with Redux Toolkit, routing, authentication, local data persistence, financial calculations, and data visualization.

The planned next stage is to build a backend using **ASP.NET Core**, connect the application to a database, and replace the current Local Storage-based persistence with a real API and server-side data management.

## 👨‍💻 Author

Built as a full-stack development learning project while improving React, Redux Toolkit, and modern frontend development skills.

