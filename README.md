# 🎮 Game Club Management System

A comprehensive gaming center management system built with Spring Boot and React, featuring member management, game tracking, transaction handling, and admin controls.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [API Documentation](#api-documentation)
- [Frontend Guide](#frontend-guide)
- [Database Schema](#database-schema)
- [Usage Guide](#usage-guide)
- [Testing](#testing)
- [Contributing](#contributing)

## ✨ Features

### 🔐 Authentication & User Management
- **Member Authentication**: Phone-based login with automatic signup
- **Admin Authentication**: Phone + password login with signup capability
- **Role-based Access**: Separate dashboards for members and admins
- **Secure Session Management**: JWT-free authentication with localStorage

### 👥 Member Management
- **Member Registration**: Easy signup with phone number and name
- **Balance Tracking**: Real-time balance updates
- **Member Search**: Find members by phone number
- **Transaction History**: Complete transaction and recharge history

### 🎮 Game Management
- **Game CRUD**: Add, edit, delete games (Admin only)
- **Game Pricing**: Set individual prices for each game
- **Game Play Tracking**: Automatic transaction creation when playing

### 💰 Financial Management
- **Recharge System**: Members can add money to their accounts
- **Transaction Processing**: Automatic balance deduction for game plays
- **Daily Collections**: Track daily revenue from recharges
- **CSV Export**: Export transactions and recharges with readable names

### 📊 Admin Dashboard
- **Real-time Statistics**: Today's collections, total members, games, transactions
- **Game Management**: Full CRUD operations for games
- **Member Overview**: View all members and their activities
- **Data Export**: CSV export with member and game names

## 🛠 Tech Stack

### Backend
- **Java 21**
- **Spring Boot 3.3.4**
- **Spring Data MongoDB**
- **MongoDB Atlas**
- **Maven**

### Frontend
- **React 18**
- **Vite**
- **Tailwind CSS**
- **React Router**
- **Axios**

## 📁 Project Structure

```
game_club/
├── src/main/java/com/sher/game_club/
│   ├── controller/          # REST Controllers
│   │   ├── GameController.java
│   │   ├── MemberController.java
│   │   ├── RechargeController.java
│   │   ├── TransactionController.java
│   │   ├── CollectionController.java
│   │   └── AdminUserController.java
│   ├── model/              # Data Models
│   │   ├── GameModel.java
│   │   ├── MemberModel.java
│   │   ├── RechargeModel.java
│   │   ├── TransactionModel.java
│   │   ├── CollectionModel.java
│   │   └── AdminUserModel.java
│   ├── repository/          # Data Access Layer
│   │   ├── GameRepository.java
│   │   ├── MemberRepository.java
│   │   ├── RechargeRepository.java
│   │   ├── TransactionRepository.java
│   │   ├── CollectionRepository.java
│   │   └── AdminUserRepository.java
│   ├── services/            # Business Logic
│   │   ├── GameService.java
│   │   ├── MemberService.java
│   │   ├── RechargeService.java
│   │   ├── TransactionService.java
│   │   ├── CollectionService.java
│   │   └── AdminUserService.java
│   ├── dto/                 # Data Transfer Objects
│   │   ├── TransactionDTO.java
│   │   └── RechargeDTO.java
│   ├── exceptions/          # Exception Handling
│   │   ├── IdNotPresentException.java
│   │   ├── BusinessException.java
│   │   └── GlobalException.java
│   └── GameClubApplication.java
├── frontend/                # React Frontend
│   ├── src/
│   │   ├── components/      # Reusable Components
│   │   ├── pages/           # Page Components
│   │   ├── services/        # API Services
│   │   ├── context/         # React Context
│   │   └── utils/           # Utility Functions
│   ├── package.json
│   └── vite.config.js
└── pom.xml
```

## 🚀 Setup Instructions

### Prerequisites
- Java 21+
- Node.js 18+
- MongoDB Atlas account
- Maven 3.6+

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd game_club
   ```

2. **Configure MongoDB**
   - Create a MongoDB Atlas cluster
   - Update `src/main/resources/application.properties` with your connection string:
   ```properties
   spring.data.mongodb.uri=mongodb+srv://username:password@cluster.mongodb.net/game_club
   ```

3. **Run the backend**
   ```bash
   ./mvnw spring-boot:run
   ```
   The backend will start on `http://localhost:8080`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp env.example .env
   ```
   Update `.env` with your backend URL:
   ```env
   VITE_API_URL=http://localhost:8080
   ```

4. **Start the frontend**
   ```bash
   npm run dev
   ```
   The frontend will start on `http://localhost:5173`

## 📚 API Documentation

### Base URL
```
http://localhost:8080
```

### Authentication Endpoints

#### Members
- `GET /members/phone/{phone}` - Find member by phone
- `POST /members` - Create new member
- `GET /members/{id}` - Get member by ID
- `PUT /members/{id}` - Update member
- `DELETE /members/{id}` - Delete member
- `GET /members/{id}/transactions/with-names` - Get member transactions with names
- `GET /members/{id}/recharges/with-names` - Get member recharges with names

#### Admin Users
- `GET /admin_users/phone/{phone}` - Find admin by phone
- `POST /admin_users` - Create new admin
- `GET /admin_users/{id}` - Get admin by ID
- `PUT /admin_users/{id}` - Update admin
- `DELETE /admin_users/{id}` - Delete admin

### Game Management
- `GET /games` - Get all games
- `POST /games` - Create new game
- `GET /games/{id}` - Get game by ID
- `PUT /games/{id}` - Update game
- `DELETE /games/{id}` - Delete game

### Transactions
- `GET /transactions/with-names` - Get all transactions with member and game names
- `POST /transactions` - Create transaction (auto-deducts from member balance)
- `GET /transactions/member/{memberId}/with-names` - Get member transactions with names

### Recharges
- `GET /recharges/with-names` - Get all recharges with member names
- `POST /recharges` - Create recharge (auto-adds to member balance)
- `GET /recharges/member/{memberId}/with-names` - Get member recharges with names

### Collections
- `GET /collections/day/{date}` - Get daily collection by date (YYYY-MM-DD)
- `GET /collections/date/{timestamp}` - Get collection by timestamp

## 🎨 Frontend Guide

### Pages
- **Role Selection** (`/`) - Choose between Member or Admin
- **Member Auth** (`/auth/member`) - Member login/signup
- **Admin Auth** (`/auth/admin`) - Admin login/signup
- **Member Dashboard** (`/dashboard/member`) - Member's game interface
- **Admin Dashboard** (`/dashboard/admin`) - Admin management interface
- **Transactions** (`/transactions`) - Transaction history
- **Recharge** (`/recharge`) - Add money to account
- **Collections** (`/collections`) - Daily collections view

### Key Components
- **Header** - Navigation and user info
- **BalanceCard** - Display member balance
- **GamesList** - List of available games
- **TransactionsTable** - Transaction history with names
- **RechargesTable** - Recharge history with names
- **GameManagement** - Admin game CRUD interface

## 🗄 Database Schema

### Collections

#### Members
```json
{
  "_id": "ObjectId",
  "name": "String (required)",
  "phone": "String (unique, required)",
  "balance": "Double (default: 0)"
}
```

#### Games
```json
{
  "_id": "ObjectId",
  "name": "String (required)",
  "description": "String",
  "price": "Double (required)"
}
```

#### Transactions
```json
{
  "_id": "ObjectId",
  "memberId": "ObjectId (ref: members._id)",
  "gameId": "ObjectId (ref: games._id)",
  "amount": "Double (auto-set from game price)",
  "dateTime": "Date (default: now)"
}
```

#### Recharges
```json
{
  "_id": "ObjectId",
  "memberId": "ObjectId (ref: members._id)",
  "amount": "Double (required)",
  "dateTime": "Date (default: now)"
}
```

#### Collections
```json
{
  "_id": "ObjectId",
  "date": "Date (required)",
  "amount": "Double (required)"
}
```

#### Admin Users
```json
{
  "_id": "ObjectId",
  "username": "String (unique, required)",
  "password": "String (required)",
  "phone": "String (unique, required)"
}
```

## 📖 Usage Guide

### For Members

1. **Registration**
   - Go to `/auth/member`
   - Enter phone number
   - If not found, fill signup form with name
   - Account created with ₹0 balance

2. **Recharging**
   - Click "Recharge" button
   - Enter amount to add
   - Balance updated automatically

3. **Playing Games**
   - Select a game from the list
   - Click "Play" button
   - Balance automatically deducted
   - Transaction recorded

4. **Viewing History**
   - Check "Transactions" page for game plays
   - Check "Recharge" page for recharge history

### For Admins

1. **Registration**
   - Go to `/auth/admin`
   - Click "Signup"
   - Enter phone, username, and password

2. **Game Management**
   - Access admin dashboard
   - Scroll to "Game Management" section
   - Add, edit, or delete games

3. **Monitoring**
   - View daily collections
   - Monitor all transactions
   - Export data to CSV

4. **Member Management**
   - View all members
   - Check member transaction history
   - Monitor member balances

## 🧪 Testing

### Backend Testing
```bash
# Test member creation
curl -X POST http://localhost:8080/members \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","phone":"1234567890","balance":0}'

# Test member lookup
curl http://localhost:8080/members/phone/1234567890

# Test game creation
curl -X POST http://localhost:8080/games \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Game","description":"A test game","price":50}'

# Test transaction creation
curl -X POST http://localhost:8080/transactions \
  -H "Content-Type: application/json" \
  -d '{"memberId":"member_id","gameId":"game_id"}'
```

### Frontend Testing
1. Start both backend and frontend
2. Navigate to `http://localhost:5173`
3. Test member registration and login
4. Test admin registration and login
5. Test game management (admin)
6. Test transactions and recharges

## 🔧 Configuration

### Environment Variables

#### Backend (`application.properties`)
```properties
# MongoDB Configuration
spring.data.mongodb.uri=mongodb+srv://username:password@cluster.mongodb.net/game_club

# Server Configuration
server.port=8080

# CORS Configuration (already configured)
```

#### Frontend (`.env`)
```env
VITE_API_URL=http://localhost:8080
NODE_ENV=development
```

## 🚨 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure backend CORS is configured
   - Check frontend API URL in `.env`

2. **MongoDB Connection**
   - Verify connection string
   - Check network access in MongoDB Atlas

3. **Port Conflicts**
   - Backend: Change `server.port` in `application.properties`
   - Frontend: Change port in `vite.config.js`

4. **Authentication Issues**
   - Clear browser localStorage
   - Check API endpoints

## 📝 API Request Examples

### Create Member
```bash
curl -X POST http://localhost:8080/members \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "phone": "9876543210",
    "balance": 100
  }'
```

### Create Game
```bash
curl -X POST http://localhost:8080/games \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Ludo King",
    "description": "Classic board game",
    "price": 25.0
  }'
```

### Create Transaction
```bash
curl -X POST http://localhost:8080/transactions \
  -H "Content-Type: application/json" \
  -d '{
    "memberId": "member_object_id",
    "gameId": "game_object_id"
  }'
```

### Create Recharge
```bash
curl -X POST http://localhost:8080/recharges \
  -H "Content-Type: application/json" \
  -d '{
    "memberId": "member_object_id",
    "amount": 500.0
  }'
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👥 Support

For support and questions:
- Create an issue in the repository
- Check the troubleshooting section
- Review the API documentation

---

**Happy Gaming! 🎮**
