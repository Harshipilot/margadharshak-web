const mongoose = require('mongoose');

/**
 * Database connection
 */
const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/margadarshak';

    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('⚠️ MongoDB not available yet. Starting backend in development mode without DB connection.');
    console.error(`   Details: ${error.message}`);
    console.log('   You can start MongoDB later with: mongod');
    console.log('   API server remains running for local testing.');
  }
};

module.exports = { connectDB };
