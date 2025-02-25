import dotenv from 'dotenv';
dotenv.config();

export const config = {
    mongodb: {
      url: process.env.MONGODB_URL,
      dbName: process.env.DB_NAME,
    },
  };

