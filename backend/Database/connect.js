const mongoose = require('mongoose');

const connectDB = async () => {
  const maxRetries = 10;
  let retries = 0;

  while (retries < maxRetries) {
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('✅ MongoDB connected');
      break;
    } catch (err) {
      console.error(`❌ DB connection failed: ${err.message}`);
      retries++;
      console.log(`🔁 Retrying to connect... (${retries}/${maxRetries})`);
      await new Promise(res => setTimeout(res, 3000)); // Wait 3 seconds
    }
  }

  if (retries === maxRetries) {
    console.error('❌ Could not connect to MongoDB after max retries');
    process.exit(1);
  }
};

module.exports = connectDB;
