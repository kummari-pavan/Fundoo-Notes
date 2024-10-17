import mongoose from 'mongoose';
import Logger from './logger';

import dotenv from 'dotenv';

class Database {
  private DATABASE: string;
  private logger;

  constructor() {
    // Replace database value in the .env file with your database config url
    this.DATABASE =
      process.env.NODE_ENV === 'test'
        ? process.env.DATABASE_TEST
        : process.env.DATABASE;

    this.logger = Logger.logger;
  }

  public initializeDatabase = async (): Promise<void> => {
    try {
      await mongoose.connect(this.DATABASE, {
        useFindAndModify: false,
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      this.logger.info('Connected to the database.');
    } catch (error) {
      this.logger.error('Could not connect to the database.', error);
    }
  };
}

//my logic
dotenv.config();
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  }
};

export default connectDB;

// export default Database;

