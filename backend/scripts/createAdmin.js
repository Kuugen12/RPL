require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../src/models/User');

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/timunova');
    console.log('✅ Connected to MongoDB');
    
    // Cek apakah admin sudah ada
    const existingAdmin = await User.findOne({ email: 'admin@timunova.com' });
    if (existingAdmin) {
      console.log('⚠️ Admin already exists');
      process.exit(0);
    }
    
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    const admin = await User.create({
      username: 'admin',
      email: 'admin@timunova.com',
      password: hashedPassword,
      role: 'admin'
    });
    
    console.log('✅ Admin created successfully:');
    console.log('   Email: admin@timunova.com');
    console.log('   Password: admin123');
    console.log('   Role:', admin.role);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin:', error);
    process.exit(1);
  }
};

createAdmin();
