// Import the MongoClient from the MongoDB driver
import { MongoClient } from 'mongodb';

// Define the MongoDB connection string directly
const uri = 'mongodb://Suzyqi7123:YHNIqKxBrU6UqWq0@cluster0-shard-00-00.jyqaq.mongodb.net:27017,cluster0-shard-00-01.jyqaq.mongodb.net:27017,cluster0-shard-00-02.jyqaq.mongodb.net:27017/?replicaSet=atlas-x3off7-shard-0&ssl=true&authSource=admin&retryWrites=true&w=majority&appName=Cluster0';

async function testConnection() {
    const client = new MongoClient(uri)

    try {
        // Attempt to connect to the database
        await client.connect();
        console.log('Successfully connected to MongoDB');

        // Optionally, perform a simple operation like listing databases
        const databasesList = await client.db().admin().listDatabases();
        console.log("Databases:");
        databasesList.databases.forEach(db => console.log(` - ${db.name}`));
    } catch (error) {
        // Log any errors that occur during connection or operations
        console.error('Failed to connect to MongoDB:', error);
    } finally {
        // Ensure that the client closes its connection
        await client.close();
    }
}

// Run the testConnection function
testConnection();
