import { config } from '../config/config.js';
import { MongoClient } from 'mongodb';

let client;  // This will hold the MongoDB client instance
let db;     // This will hold the database connection

export async function connectDB() {
    if (db) {
        return db;
    }

    try {
        console.log("Attempting to connect to MongoDB", config.mongodb.url);
        if (!config.mongodb.url) {
            throw new Error("MongoDB URL is not defined in the config.");
        }
        client = new MongoClient(config.mongodb.url);  
        // Ensure URL is correctly loaded



        await client.connect();
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
        console.log("Database connection closed");
        db = null;
        client = null;
    }
}

const dbConnection = {
    connectDB,
    closeDB,
  };
  
export default dbConnection;
  
