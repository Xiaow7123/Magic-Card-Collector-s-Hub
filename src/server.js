import express from 'express';
import bodyParser from 'body-parser';
import { connect } from './db/mongodb';
import process from 'node:process';
import cardRoutes from './routes/cardRoutes';
import cors from 'cors';

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000; 

app.use(cors({ 
  origin: 'http://127.0.0.1:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

// Middleware
app.use(bodyParser.json());
// Serve static files from 'public' directory
app.use(express.static('public')); 
// Use cardRoutes for all card-related API endpoints
app.use('/cards', cardRoutes);

// MongoDB connection
connect().then(() => {
  // Start the server only if MongoDB connects successfully
  app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  // Handle errors if MongoDB connection fails
  console.error("Failed to connect to MongoDB", err);
  process.exit(1);  // Exit the process with an error code
});

