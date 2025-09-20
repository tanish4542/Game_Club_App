# Gaming Club Management System - Frontend

A React frontend application for the Gaming Club Management System built with Vite, React Router, and Tailwind CSS.

## Features

### Member Features
- **Phone-based Authentication**: Login with phone number or create new account
- **Game Playing**: Browse and play games with automatic balance deduction
- **Balance Management**: View current balance and add money via recharges
- **Transaction History**: View personal transaction history
- **Real-time Updates**: Balance updates automatically after transactions

### Admin Features
- **Admin Dashboard**: Overview of daily collections, members, games, and transactions
- **Daily Collections**: View collection totals for specific dates
- **Transaction Management**: View all member transactions
- **Data Export**: Export transactions and recharges to CSV
- **Member Overview**: View all registered members

## Tech Stack

- **React 18** with Vite for fast development
- **React Router DOM** for client-side routing
- **Tailwind CSS** for styling
- **Axios** for HTTP requests
- **React Context** for state management

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend API running (Spring Boot + MongoDB)

## Installation

1. Clone the repository and navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp env.example .env
```

4. Update the `.env` file with your backend API URL:
```env
VITE_API_URL=http://localhost:8080
```

## Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Building for Production

Build the application:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## API Integration

The frontend integrates with the following backend endpoints:

### Members
- `GET /members/phone/{phone}` - Find member by phone
- `POST /members` - Create new member
- `GET /members/{id}` - Get member details
- `GET /members/{id}/recharges` - Get member recharges
- `GET /members/{id}/transactions` - Get member transactions

### Games
- `GET /games` - Get all games
- `GET /games/{id}` - Get game details

### Transactions
- `POST /transactions` - Create transaction (auto-sets amount from game price)
- `GET /transactions` - Get all transactions

### Recharges
- `POST /recharges` - Create recharge (auto-updates member balance)
- `GET /recharges` - Get all recharges

### Collections
- `GET /collections/day/{date}` - Get daily collection total

### Admin Users
- `GET /admin_users` - Get all admin users (for login)

## Important Notes

### Backend Requirements

The frontend expects the following backend behaviors:

1. **Member Balance**: Defaults to 0.0 when not specified
2. **Transaction Amount**: Automatically set from game price
3. **Balance Updates**: Member balance automatically updated on recharges/transactions
4. **Daily Collections**: Computed from recharges for each day

### Security Considerations

⚠️ **IMPORTANT**: The current admin authentication uses client-side credential matching, which is **insecure for production**. 

**Required Backend Changes for Production:**
1. Implement a secure admin login endpoint: `POST /admin_users/login`
2. Return JWT tokens or session cookies
3. Add proper password hashing
4. Implement rate limiting and security headers

### Environment Variables

- `VITE_API_URL`: Backend API base URL (default: http://localhost:8080)
- `NODE_ENV`: Environment (development/production)

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.jsx
│   ├── BalanceCard.jsx
│   ├── GameCard.jsx
│   ├── GamesList.jsx
│   ├── TransactionsTable.jsx
│   ├── RechargesTable.jsx
│   ├── ProtectedRoute.jsx
│   └── LoadingSpinner.jsx
├── context/            # React Context for state management
│   └── AuthContext.jsx
├── pages/              # Page components
│   ├── RoleSelect.jsx
│   ├── CustomerAuth.jsx
│   ├── AdminAuth.jsx
│   ├── CustomerDashboard.jsx
│   ├── AdminDashboard.jsx
│   ├── Recharge.jsx
│   ├── Transactions.jsx
│   └── Collections.jsx
├── services/           # API service functions
│   └── api.js
├── utils/              # Utility functions
│   └── date.js
├── App.jsx             # Main app component with routing
├── main.jsx            # App entry point
└── index.css           # Global styles
```

## Usage

### Member Flow
1. Select "Member" role
2. Enter phone number to login or create account
3. View dashboard with balance and available games
4. Play games (balance automatically deducted)
5. Add money via recharge page
6. View transaction history

### Admin Flow
1. Select "Admin" role
2. Login with username/password
3. View dashboard with daily collections and statistics
4. Export transaction/recharge data to CSV
5. View daily collections by date

## Troubleshooting

### Common Issues

1. **API Connection Failed**: Check if backend is running and `VITE_API_URL` is correct
2. **CORS Errors**: Ensure backend has CORS configured for frontend domain
3. **Authentication Issues**: Clear localStorage and try logging in again
4. **Build Errors**: Ensure all dependencies are installed with `npm install`

### Development Tips

- Use browser dev tools to inspect API calls
- Check console for error messages
- Verify backend endpoints are responding correctly
- Test with different user roles (customer/admin)

## Contributing

1. Follow the existing code structure
2. Use Tailwind CSS for styling
3. Implement proper error handling
4. Add loading states for async operations
5. Test with both customer and admin flows

## License

This project is part of the Gaming Club Management System.
