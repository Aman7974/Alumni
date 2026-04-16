# SQL to MongoDB Migration Guide

This document explains how to migrate your existing SQL data to MongoDB.

## Prerequisites

1. **MongoDB installed and running**
   - Install MongoDB from: https://www.mongodb.com/try/download/community
   - Start MongoDB service (Windows: `net start MongoDB`)

2. **Node.js dependencies installed**
   ```bash
   npm install
   ```

3. **Environment variables configured**
   - Copy `.env.example` to `.env` (if not already done)
   - Ensure `MONGODB_URI` is set correctly in `.env`
   - Default: `mongodb://localhost:27017/alumni_db`

## Migration Steps

### Step 1: Verify MongoDB Connection

Make sure MongoDB is running and accessible at the configured URI.

### Step 2: Run the Migration Script

Execute the migration script to import all SQL data into MongoDB:

```bash
npm run migrate
```

Or directly:

```bash
node scripts/migrate-from-sql.js
```

### Step 3: Verify Migration

After migration completes, you should see output like:

```
✅ Connected to MongoDB
🗑️  Clearing existing collections...
✅ Collections cleared
📚 Migrating Courses...
   - Course: BSC
   - Course: MCS
🎓 Migrating Alumnus Bio...
   - Alumnus: Meet Devin (alumnus@gmail.com)
...
✅ Migration completed successfully!
```

### Step 4: Start the Server

```bash
npm start
```

## What Gets Migrated

The migration script transfers the following data from SQL to MongoDB:

| SQL Table | MongoDB Collection | Records |
|-----------|-------------------|---------|
| `courses` | courses | 2 |
| `alumnus_bio` | alumnusbios | 1 |
| `users` | users | 2 |
| `careers` | careers | 2 |
| `events` | events | 3 |
| `event_commits` | eventcommits | 2 |
| `forum_topics` | forumtopics | 2 |
| `forum_comments` | forumcomments | 2 |
| `gallery` | galleries | 4 |
| `system_settings` | systemsettings | 1 |

## Data Transformations

The migration script handles the following transformations:

1. **ID Conversion**: SQL integer IDs are preserved as MongoDB `_id` values
2. **Gender Normalization**: `male` → `Male`, `female` → `Female`
3. **Type Normalization**: `admin` → `Admin`, `alumnus` → `Alumnus`
4. **Path Normalization**: Windows paths (`\`) converted to Unix paths (`/`)
5. **Date Parsing**: SQL date strings converted to JavaScript Date objects
6. **Boolean Conversion**: `status: 1` → `status: true`

## Reference Relationships

The migration preserves SQL relationships using MongoDB ObjectIds:

- `AlumnusBio.course_id` → references `Course._id`
- `User.alumnus_id` → references `AlumnusBio._id`
- `Career.user_id` → references `User._id`
- `EventCommit.event_id` → references `Event._id`
- `EventCommit.user_id` → references `User._id`
- `ForumTopic.user_id` → references `User._id`
- `ForumComment.topic_id` → references `ForumTopic._id`
- `ForumComment.user_id` → references `User._id`

## Troubleshooting

### MongoDB Connection Error

```
❌ MongoDB connection error
```

**Solution**: Ensure MongoDB is running:
- Windows: `net start MongoDB`
- Check `MONGODB_URI` in `.env`

### Duplicate Key Error

```
E11000 duplicate key error
```

**Solution**: The migration script clears collections before inserting. If you see this error, collections may not have been cleared. Run the migration again.

### Module Not Found

```
Error: Cannot find module 'mongoose'
```

**Solution**: Install dependencies:
```bash
npm install
```

## Post-Migration

After successful migration:

1. **Verify data in MongoDB Compass** (optional)
   - Connect to `mongodb://localhost:27017`
   - Check `alumni_db` database
   - Verify collections have expected document counts

2. **Test the API**
   - Start server: `npm start`
   - Test login with existing credentials:
     - Admin: `admin@gmail.com` / (original password)
     - Alumnus: `alumnus@gmail.com` / (original password)

## Rolling Back

To roll back to SQL:

1. Stop the Node.js server
2. Reconfigure your application to use SQL database
3. Restore SQL backup if needed

## Adding New Data from SQL

If you have new SQL data to add after initial migration:

1. Update `sqlData` object in `scripts/migrate-from-sql.js`
2. Re-run the migration script

**Note**: The migration script clears all collections before inserting, so it's a full refresh, not an incremental update.

## Security Notes

- Passwords are already hashed (bcrypt) in the SQL dump
- JWT secret should be changed for production
- Email credentials in `.env` should be secured
