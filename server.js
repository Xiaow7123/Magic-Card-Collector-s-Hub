import dotenv from 'dotenv';

dotenv.config();

console.log('MongoDB URL:', process.env.MONGODB_URL);
console.log('Database Name:', process.env.DB_NAME);

import express from 'express';
import dbConnection from './src/db/mongo.js';  
import cardRoutes from './src/routes/cardRoutes.js';
import { fileURLToPath } from "url";
import path from "path";
import process from 'process';
import cors from 'cors';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create Express app
const app = express();
//require cors
const corsOptions = {
  origin: 'http://127.0.0.1:3001',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
  // Set the port
const PORT = process.env.PORT || 3000; 

app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Used to parse URL-encoded bodies
app.use(express.static(path.join(__dirname, "frontend")));

// Connect to database
dbConnection.connectDB().catch(console.error);

// Serve index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

// Use cardRoutes for all card-related API endpoints
app.use('/api/cards', cardRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
