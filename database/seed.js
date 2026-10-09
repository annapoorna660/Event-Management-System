const dotenv = require('dotenv');
dotenv.config();
const db = require('../config/db');
const bcrypt = require('bcryptjs');

async function runSeed() {
  try {
    await db.initDatabase();
    console.log('🌱 Starting database seeding script...');

    // Hash passwords
    const userPass = await bcrypt.hash('user123', 10);
    const adminPass = await bcrypt.hash('admin123', 10);

    // Create users if not exist
    const users = [
      { name: 'Admin User', email: 'admin@eventhub.com', password: adminPass, role: 'admin' },
      { name: 'John Doe', email: 'john@example.com', password: userPass, role: 'user' },
      { name: 'Sarah Smith', email: 'sarah@example.com', password: userPass, role: 'user' },
      { name: 'Alex Johnson', email: 'alex@example.com', password: userPass, role: 'user' }
    ];

    for (const u of users) {
      try {
        await db.query(
          'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
          [u.name, u.email, u.password, u.role]
        );
      } catch (err) {
        // User already exists
      }
    }

    console.log('✅ Users seeded!');
    console.log('✨ Demo Seeding completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error during seeding:', err);
    process.exit(1);
  }
}

runSeed();
