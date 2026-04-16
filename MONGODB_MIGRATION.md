# MongoDB Migration Guide

This project has been migrated from MySQL (Sequelize) to MongoDB (Mongoose).

## Changes Made

### 1. Dependencies
- **Removed**: `sequelize`, `mysql`, `mysql2`
- **Added**: `mongoose`

### 2. Database Connection
- **File**: `backend/utils/db.js`
- Now uses `mongoose.connect()` instead of Sequelize
- Connection string: `MONGODB_URI` environment variable

### 3. Models
All models converted from Sequelize to Mongoose schemas:
- `User` - User accounts
- `AlumnusBio` - Alumni profiles
- `Career` - Job postings
- `Course` - Course information
- `Event` - Events
- `EventCommit` - Event participation
- `ForumTopic` - Forum topics
- `ForumComment` - Forum comments
- `Gallery` - Gallery images
- `SystemSetting` - System settings

### 4. Controllers
All controllers updated to use Mongoose methods:
- `findAll()` → `find()`
- `findByPk()` → `findById()`
- `create()` → `create()` (same)
- `update()` → `findByIdAndUpdate()`
- `destroy()` → `findByIdAndDelete()`
- `count()` → `countDocuments()`

## Setup Instructions

### Prerequisites
- MongoDB installed and running locally

### Start MongoDB
```bash
# On Windows (if MongoDB is installed as a service)
net start MongoDB

# Or run mongod manually
mongod --dbpath "C:\data\db"
```

### Install Dependencies
```bash
cd backend
npm install
```

### Environment Variables
Create `.env` file in `backend/`:
```env
MONGODB_URI=mongodb://localhost:27017/alumni_db
JWT_SECRET=supersecretkey
PORT=3000
NODE_ENV=development
```

### Run the Server
```bash
cd backend
npm start
```

## Data Migration (Optional)

If you have existing MySQL data to migrate:

1. Export data from MySQL:
```bash
mysqldump -u root -p alumni_db > alumni_backup.sql
```

2. Use a migration tool or script to convert SQL data to MongoDB format

3. Or manually re-enter data through the admin interface

## Key Differences

| Sequelize (MySQL) | Mongoose (MongoDB) |
|-------------------|-------------------|
| Integer IDs | ObjectId (_id) |
| Fixed schema | Flexible schema |
| SQL queries | NoSQL queries |
| JOINs | Population ($lookup) |
| Transactions | Multi-document transactions |

## API Changes
- All ID-based routes now accept MongoDB ObjectIds instead of integers
- Response format remains the same for backward compatibility
- `_id` field replaces `id` in JSON responses
