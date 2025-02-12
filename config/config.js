// config.js
import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file

export default {
  jwtSecret: process.env.JWT_SECRET || 'your_default_secret'
};
