# Sweet Shop Management System

A full-stack web application demonstrating backend engineering, frontend UI/UX, role-based access control, and database integration. Built using Test-Driven Development (TDD) with clean architecture principles.

---

## 1. Project Overview

The Sweet Shop Management System is a realistic shop simulation that enables users to browse and purchase sweets while providing administrators with complete inventory management capabilities.

### Core Capabilities

- **User and Admin Roles**: Distinct experiences based on user role
- **Authentication and Authorization**: Secure JWT-based authentication with role-based access control
- **Inventory Management**: Real-time stock tracking with admin-only modification
- **Quantity-Based Purchasing**: Users can select specific quantities with validation
- **Role-Based UI Behavior**: Different interfaces for customers and administrators

This project was developed following Test-Driven Development practices, ensuring robust functionality and maintainable code.

---

## 2. Features

### User Features

| Feature | Description |
|---------|-------------|
| Registration | Register with email, password, phone number, and role selection |
| Login | Secure authentication using email and password |
| Browse Sweets | View all available sweets with details |
| Search | Search sweets by name, category, or price range |
| Purchase | Select quantity and purchase sweets |
| Stock Validation | Purchase button disabled when stock is zero or quantity exceeds availability |

### Admin Features

| Feature | Description |
|---------|-------------|
| Admin Login | Authenticate with admin credentials |
| Add Sweets | Create new sweets with name, category, price, and initial stock |
| Restock | Increase stock quantity for existing sweets |
| Delete | Remove sweets from inventory |
| Inventory Control | Exclusive access to inventory management actions |
| Read-Only Purchase View | Admin view displays sweet details without purchase functionality |

---

## 3. Tech Stack

### Backend

| Technology | Purpose |
|------------|---------|
| Node.js | Runtime environment |
| TypeScript | Type-safe development |
| Express | Web framework |
| Prisma ORM | Database abstraction and migrations |
| SQLite | Database |
| JWT | Authentication tokens |
| bcrypt | Password hashing |
| Jest | Testing framework |

### Frontend

| Technology | Purpose |
|------------|---------|
| React | UI library |
| TypeScript | Type-safe components |
| Vite | Build tool and dev server |
| Axios | HTTP client |
| CSS | Styling (vanilla CSS, no frameworks) |

---

## 4. Project Structure

```
sweet-shop-management-system/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── auth/
│   │   ├── sweets/
│   │   └── index.ts
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── styles/
│   │   └── App.tsx
│   ├── package.json
│   └── vite.config.ts
├── screenshots/
└── README.md
```

- **backend/**: Express server with authentication, sweet management, and inventory APIs
- **frontend/**: React application with role-based UI components
- **prisma/**: Database schema and migrations
- **screenshots/**: Application UI screenshots

---

## 5. Setup and Installation

### Prerequisites

- Node.js (v18 or higher)
- npm

### Backend Setup

```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
```

Backend runs on: `http://localhost:3000`

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on: `http://localhost:5173`

**Note**: Both servers must be running simultaneously for the application to function properly.

---

## 6. API Overview

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Authenticate and receive JWT |

### Sweets

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/sweets` | Public | Get all sweets |
| GET | `/api/sweets/search` | Public | Search sweets by criteria |
| POST | `/api/sweets` | Admin | Add a new sweet |
| PUT | `/api/sweets/:id` | Admin | Update sweet details |
| DELETE | `/api/sweets/:id` | Admin | Delete a sweet |

### Inventory

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/sweets/:id/purchase` | User | Purchase specified quantity |
| POST | `/api/sweets/:id/restock` | Admin | Add stock to a sweet |

---

## 7. Screenshots

### Login Page

*Screenshot placeholder*

### Registration Page

*Screenshot placeholder*

### User Dashboard

*Screenshot placeholder*

### Admin Dashboard

*Screenshot placeholder*

### Admin Add / Restock Sweet

*Screenshot placeholder*

> Screenshots of the final application UI are provided in the `/screenshots` folder.

---

## 8. My AI Usage

### AI Tools Used

- ChatGPT

### How AI Was Used

- Used ChatGPT to brainstorm backend API design and endpoint structure
- Used ChatGPT to review Prisma schema changes and relationships
- Used ChatGPT to debug TypeScript and Prisma errors during development
- Used ChatGPT to review UI layout consistency and alignment decisions
- Used ChatGPT as a sounding board for architectural decisions, not as a code generator

### Human Ownership Statement

The following aspects were designed and implemented manually by the developer:

- All business logic and application flow
- Architectural decisions and code structure
- Database schema design and relationships
- Role-based authorization middleware and guards
- All unit and integration tests
- UI behavior and interaction patterns
- CSS styling and responsive design

### Reflection

AI assistance improved productivity by providing quick debugging suggestions and serving as a reference for best practices. This allowed faster iteration while maintaining full ownership and understanding of the codebase. All AI suggestions were critically evaluated before implementation, ensuring the final code reflects deliberate design choices.

---

## 9. Testing

### Approach

This project follows Test-Driven Development (TDD) methodology, with tests written before implementation.

### Framework

- Jest for backend testing

### Coverage Areas

| Area | Tests Include |
|------|---------------|
| Auth Validation | Email format, password strength, required fields |
| Role-Based Authorization | Admin-only routes, user restrictions |
| Inventory Logic | Stock updates, quantity validation |
| Quantity-Based Purchasing | Valid ranges, stock limits, edge cases |
| Admin-Only Enforcement | Middleware protection, unauthorized access handling |

### Running Tests

```bash
cd backend
npm test
```

---

## 10. Future Improvements

| Enhancement | Description |
|-------------|-------------|
| Payment Gateway | Integrate Stripe or Razorpay for real transactions |
| Order History | Track and display user purchase history |
| Admin Analytics | Dashboard with sales metrics and inventory insights |
| Pagination and Sorting | Handle large inventories efficiently |
| Cloud Deployment | Deploy to AWS, Vercel, or Railway |
| Email Notifications | Order confirmations and low-stock alerts |

---

## 11. Author

**Kunal Vaya** – Final Year CSE Student

---

## License

This project is open source and available under the MIT License.
