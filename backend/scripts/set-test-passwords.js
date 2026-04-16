/**
 * Set Test Passwords Script
 *
 * Sets known passwords for testing accounts.
 * Run this AFTER migrating from SQL.
 *
 * Usage: node scripts/set-test-passwords.js
 */

import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { User } from '../models/Index.js';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/alumni_db';

// Test passwords
const TEST_PASSWORDS = {
  'admin@gmail.com': 'admin123',
  'alumnus@gmail.com': 'alumnus123'
};

async function setPasswords() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    for (const [email, plainPassword] of Object.entries(TEST_PASSWORDS)) {
      const hashedPassword = await bcrypt.hash(plainPassword, 10);

      const result = await User.updateOne(
        { email: email.toLowerCase() },
        { password: hashedPassword }
      );

      if (result.modifiedCount > 0 || result.matchedCount > 0) {
        console.log(`✅ Password set for: ${email}`);
        console.log(`   New password: ${plainPassword}\n`);
      } else {
        console.log(`⚠️  User not found: ${email}\n`);
      }
    }

    console.log('✅ Test passwords configured successfully!');
    console.log('\n📝 Login credentials:');
    console.log('   Admin:  admin@gmail.com / admin123');
    console.log('   Alumnus: alumnus@gmail.com / alumnus123');

  } catch (err) {
    console.error('❌ Error:', err);
    throw err;
  } finally {
    await mongoose.disconnect();
    console.log('\n👋 Disconnected from MongoDB');
  }
}

setPasswords().catch((err) => {
  console.error('Script failed:', err);
  process.exit(1);
});
