import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/alumni_db';

async function createAdmin() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    const db = mongoose.connection.db;
    const users = db.collection('users');

    const hashedPassword = await bcrypt.hash('admin123', 10);

    const adminUser = {
      name: 'Admin User',
      email: 'admin@gmail.com',
      password: hashedPassword,
      type: 'Admin',
      alumnus_id: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await users.insertOne(adminUser);
    console.log('✅ Admin user created successfully!');
    console.log('\n📝 Login credentials:');
    console.log('   Email: admin@gmail.com');
    console.log('   Password: admin123');

  } catch (err) {
    console.error('❌ Error:', err);
    throw err;
  } finally {
    await mongoose.disconnect();
    console.log('\n👋 Disconnected from MongoDB');
  }
}

createAdmin().catch((err) => {
  console.error('Script failed:', err);
  process.exit(1);
});
