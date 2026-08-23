import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { Admin } from './models/Admin.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const updateAdmin = async () => {
  try {
    console.log('Connecting to database...');
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB.');

    const username = 'nihartambde66@gmail.com';
    const rawPassword = 'Nihar@960435';
    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    // Delete existing admin records and insert the new one
    await Admin.deleteMany({});
    const newAdmin = new Admin({
      username,
      password: hashedPassword
    });
    await newAdmin.save();

    console.log('✔ Admin user successfully updated/created:');
    console.log(`  Username: ${username}`);
    console.log(`  Password: ${rawPassword}`);

    await mongoose.disconnect();
    console.log('Disconnected from database.');
    process.exit(0);
  } catch (error) {
    console.error('Error updating admin user:', error);
    process.exit(1);
  }
};

updateAdmin();
