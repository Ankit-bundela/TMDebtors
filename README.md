# TMDebtors Accounting

A full-stack **Accounting and Invoice Management System** for businesses to manage customers, items, invoices, and roles.

---

# Tech Stack

# Frontend (React)
- React JS + Tailwind + Material-UI
- React Router DOM for routing
- Fetch for API calls
- Protected Routes + Login/Register
- Snackbar, Accordion, Dialogs

### 🐍 Backend (Python - Socket Based)
- Custom Python socket server Create 
- Oracle DB Integration
- JWT Token Auth (Login/Register)
- Role-Based Access (Admin, Accountant)
- Folder structure:
├── server/python DebtorsAccounting.py (socket server)
└── datalayer/
├── entities.py # User, Customer, Item,Invoice,State All are Classes
└── managers.py # CRUD + Auth logic



---

## Features
- Invoice Create / View / Delete
- Customer & Item Management with Interastate and Interstate
- GST Calculation (SGST, CGST, IGST)
- UOM and HSN mapping
- JWT Auth with Role restriction

---

## Screenshots

> ![Start](<img src="ScreenShot/s1.jpg" alt="Start server"/>)

>### ➕ Add Dash Board
![Add Invoice](<img src="ScreenShot/s2.jpg" alt="Invoice"/>)

### 🔐 Item Add 
![Item](<img src="ScreenShot/s4.jpg" alt="Start server"/>)


### 📋 All Create Invoices View
![All Invoices](<img src="ScreenShot/s4.jpg" alt="Create Invoice"/>)



### How To Run
Backend (Python)
cd backend
python server/DebtorsAccounting.py

Frontend (React)
npm install
npm start




