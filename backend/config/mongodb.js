import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    mongoose.connection.on('error', (error) => {
      throw new Error(`Database connection error: ${error.message}`);
    });

    mongoose.connection.once('disconnected', () => {
      console.log('MongoDB: Connection lost');
    });

    await mongoose.connect(`${process.env.MONGODB_URI}/miy`);

    return mongoose.connection;
  } catch (error) {
    throw new Error(`MongoDB connection failed: ${error.message}`);
  }
};

export default connectDB;
