# Finance Dashboard Backend
A backend system built using **Node.js**, **Express.js** and **MongoDB** that manages financial
records, user roles and provide analytics for dashboard.

---

## Project Overview
This project simulates a finance dashboard system where user can:

- Manage financial records (income & expenses)
- Request role upgrades (viewer to analyst)
- Access analytics based on roles
- View dashboard insights like totals, trends and category breakdowns

The backend focuses on:

- Clean architecture
- Role-Based Access Control (RBAC)
- Aggregation based analytics
- Scalable API design

---

## Features

  ### User & Role Management
  - User registration and login
  - Roles:
      - Viewer -> Can view only limited data
      - Analyst -> Can view analytics
      - Admin -> Full Access (manage users & records)
  - Default role: Viewer
  - Role upgrade system ( Viewer -> analyst via admin approval)

  ### Role Request System
  - User can request analyst role
  - Admin can:
      - approve
      - reject
  - User can check request status

  ### Financial Records
  - Create, update, delete and view records
  - Fields:
      - amount
      - type (income / expense)
      - category
      - date
      - note (optional)
  - Supports filtering (date. category & type)

 ### Dashboard Analytics
 - Total income
 - Total expenses
 - Net balance
 - Category breakdown
 - Monthly trends
 - Recent transactions

---

## Validation & Error Handling
- Input validation for all APIs
- Proper status codes
- Error handling middleware

---

## Tech Stack
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

## Project Structure
```
financeDataProcessing/
├── .gitignore
├── config/
│   └── db.js
├── controllers/
│   ├── authController.js
│   ├── dashboardController.js
│   ├── recordController.js
│   └── userController.js
├── financeDetails.http
├── index.js
├── middleware/
│   └── authMiddleware.js
├── models/
│   ├── Record.js
│   ├── RoleRequest.js
│   └── User.js
├── node_modules/
│   
├── package-lock.json
├── package.json
├── routes/
│   ├── authRoutes.js
│   ├── dashboardRoutes.js
│   ├── recordRoutes.js
│   └── roleRequestRoutes.js
└── seedAdmin.js

```
---

## Installation & Setup

1. ### Clone the repository
```
git clone https://github.com/invincibleAditya303/financeDataProcessing.git
cd project
```

2. ### Install Dependencies
npm install

3. ### Environment Variables
   ```
   PORT = 5000
   MONGO_URI = Your mongodb connection
   JWT_SECRET = your_secret_key
   ```
4. ### Run the Server
   npm run dev
---

## API Endpoints

  ### Auth
  |-----|------------------|
  |POST |/api/auth/regitser|
  |POST |/api/auth/login   |
  |-----|------------------|

  ### Role Requests
  POST /api/role -> Request analyst role
  GET /api/role -> Admin: Gets all requests
  PATCH /api/role/:id -> Admin approve/reject

  ###  Records
  POST /api/records
  GET /api/records
  GET /api/records/:id
  PATCH api/records/:id
  DELETE /api/records/:id

  ### Dashboard
  GET /api/dashboard/summary
  GET api/dashboard/category
  GET /api/dashboard/trends
  GET /api/dashboard/recent
  GET /api/dashboard/income-expense

---

## Assumptions
- Users can only request analyst role
- Admin role is maually assigned
- Each record belongs to a single user
- Analytics are based on stored transaction dates

---

## Future Improvements
- Email approval for role approval
- Pagination & Search
- Advanced analytics (Yearly trends)

---

## Conclusion
- Backend architecture design
- Role-based access control
- Data aggregation & analytics
- Clean and maintainable code practices

---

## Author
Aditya Ammu
