import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Admin } from './models/Admin.js';

dotenv.config();

const check = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const admins = await Admin.find({});
    console.log('Registered Admin Users:');
    admins.forEach(a => {
      console.log(`- Username: ${a.username}, Hash: ${a.password}`);
    });
    await mongoose.disconnect();
  } catch (err) {
    console.error(err);
  }
};

check();
