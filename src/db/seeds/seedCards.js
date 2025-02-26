import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const cards = [
    { "name": "Item1", "value": 1, "type": "type1" },
    { "name": "Item2", "value": 2, "type": "type2" },
    { "name": "Item3", "value": 3, "type": "type3" },
    { "name": "Item3", "value": 3, "type": "type3" },
    { "name": "Item3", "value": 3, "type": "type3" },
    { "name": "Item3", "value": 3, "type": "type3" },
    { "name": "Item3", "value": 3, "type": "type3" },
    { "name": "Item3", "value": 3, "type": "type3" },
    { "name": "Item3", "value": 3, "type": "type3" },
    { "name": "Item3", "value": 3, "type": "type3" },
    { "name": "Item3", "value": 3, "type": "type3" },
    { "name": "Item3", "value": 3, "type": "type3" },
    { "name": "Item3", "value": 3, "type": "type3" },
    { "name": "Item3", "value": 3, "type": "type3" },
    { "name": "Item3", "value": 3, "type": "type3" },
    { "name": "Item3", "value": 3, "type": "type3" },
    { "name": "Item3", "value": 3, "type": "type3" },
    { "name": "Item3", "value": 3, "type": "type3" },
    { "name": "Item3", "value": 3, "type": "type3" },
    { "name": "Item3", "value": 3, "type": "type3" },
    { "name": "Item3", "value": 3, "type": "type3" },
    { "name": "Item3", "value": 3, "type": "type3" },
    { "name": "Item3", "value": 3, "type": "type3" },
    { "name": "Item3", "value": 3, "type": "type3" },
    { "name": "Item3", "value": 3, "type": "type3" },
];

async function seedCards() {
    let client;
    try {
        client = await MongoClient.connect(process.env.MONGODB_URL);
        const db = client.db(process.env.DB_NAME);
        console.log("Connected to the database");
        const document = cards.map((card) => ({
            ...card,
            createdAt: new Date(),
            updatedAt: new Date(),
        }));
        const result = await db.collection('cards').insertMany(document);
        console.log(`Successfully inserted ${result.insertedCount} messages`);
    } catch (error) {
        console.error("Error seeding database:", error);
    } finally {
        await client.close();
        console.log("Disconnected from the database");
    }
}

seedCards();
