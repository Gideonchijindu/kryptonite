import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const connectDB = async () => {
  try {
    // Connect to MongoDB using the URI from environment variables
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true, // Use the new MongoDB connection string parser
      useUnifiedTopology: true, // Use the new Server Discover and Monitoring engine
    });

    const db = mongoose.connection;

    db.on('error', (error) => {
      console.error('MongoDB has connection error:', error);
    });

    db.once('open', () => {
      console.log('MongoDB is connected🔥');
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
