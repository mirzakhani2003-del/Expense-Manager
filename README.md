# Expense Manager 💰

A modern expense management application built with React that helps users track their income, expenses, categories, and wallets in a simple and organized way.

The application allows users to manage their personal finances by creating transactions, organizing them with categories, managing multiple wallets, and analyzing their financial data through charts.

## ✨ Features

### Authentication & User Management

- User registration and login
- Protected routes
- User-specific data management
- Persistent authentication using local storage

### Transaction Management

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

### Wallet Management

- Create multiple wallets
- Edit wallet information
- Delete wallets
- Prevent deleting wallets that contain transactions
- Track wallet balance based on transaction history
- Transfer money between wallets
- Prevent spending more than the available wallet balance

### Categories

- Create custom categories
- Manage user-specific categories
- Organize transactions based on categories

### Dashboard & Analytics

- Financial overview dashboard
- Total balance calculation
- Income and expense summary
- Savings rate calculation
- Expense distribution chart
- Income and expense trend chart

## 📊 Charts

The application uses charts to provide financial insights:

- Expense breakdown by category
- Income and expense trends over time

Transfers between wallets are excluded from financial reports because they represent money movement, not actual income or expenses.

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
- Local Storage persistence

### Development Tools

- Git
- GitHub

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

```
http://localhost:5173
```

## 💡 Main Concepts Practiced

This project was built to practice and demonstrate:

- React component architecture
- State management with Redux Toolkit
- React Router navigation
- Form handling and validation
- Data persistence with Local Storage
- Reusable components
- Financial calculations
- Data visualization
- Responsive UI design

## 📌 Future Improvements

Possible future improvements:

- Backend API integration with ASP.NET Core
- Database integration
- User authentication with JWT
- Cloud data synchronization
- Export transactions as CSV
- Multiple currencies
- Advanced financial reports

## 👨‍💻 Author

Built as a full-stack development learning project while improving React and modern frontend development skills.
