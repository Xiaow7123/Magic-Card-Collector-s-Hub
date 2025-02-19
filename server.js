import express from 'express';
//import bodyParser from 'body-parser';
import dbConnection from './src/db/mongo';  
import process from 'node:process';
import cardRoutes from './src/routes/cardRoutes';
import cors from 'cors';
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create Express app
const app = express();
// Set the port
const PORT = process.env.PORT || 3000; 

app.use(cors({ 
  origin: 'http://127.0.0.1:3000',
}));


// Middleware
app.use("/api", express.json());
app.use(express.static(path.join(__dirname, "frontend")));


// Use cardRoutes for all card-related API endpoints
app.use('/api/cards', cardRoutes);

// Serve index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// Connect to database
dbConnection.connectDB().catch(console.error);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;