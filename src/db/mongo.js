import { MongoClient } from 'mongodb';
import { config } from '../config/config.js';

let db = null;
let client = null;

// Connect to MongoDB
export async function connectDB() {
    if (db) return db;
    try {  // Return existing db instance if already connected
        console.log("Attempting to connect to MongoDB");
        client = await MongoClient.connect(config.mongodb.uri, { useNewUrlParser: true, useUnifiedTopology: true });
        db = client.db(config.mongodb.dbName);
        console.log("Connected to MongoDB:", config.mongodb.dbName);
        return db;
    } catch (error) {
        console.error("Could not connect to MongoDB:", error);
        throw error;
    }
}



export async function closeDB() {
    if (client) {
        await client.close();
        db = null;
        client = null;
        console.log("Database connection closed");}
}

const dbConnection = {
    connectDB,
    closeDB,
  };
  
export default dbConnection;
  
