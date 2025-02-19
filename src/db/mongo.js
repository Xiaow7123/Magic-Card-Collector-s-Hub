import { MongoClient } from 'mongodb';

// Configuration
const url = 'mongodb://localhost:27017'; // MongoDB server URL
const dbName = 'magicCardDB'; // Database name

let db = null;

// Connect to MongoDB
async function connect() {
    if (db) return db;  // Return existing db instance if already connected
    try {
        const client = await MongoClient.connect(url, { useUnifiedTopology: true });
        db = client.db(dbName);
        console.log("Connected to MongoDB:", dbName);
        return db;
    } catch (error) {
        console.error("Could not connect to MongoDB:", error);
        throw error;
    }
}

// Get database instance
function getDb() {
    if (!db) {
        throw new Error('Database not initialized. Call connect first!');
    }
    return db;
}

export { connect, getDb };
