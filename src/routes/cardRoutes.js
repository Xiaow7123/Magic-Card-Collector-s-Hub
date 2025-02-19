//import required modules
import express from 'express';
const router = express.Router();
import { getDb } from '../db/mongo';

//write API endpoints 
// create a new card 


// POST /cards - Create a new card
router.post('/', async (req, res) => {
    const { name, rarity, type } = req.body;
    const db = getDb();
    try {
      const collection = db.collection('cards');
      const result = await collection.insertOne({ name, rarity, type });
      res.status(201).json(result.ops[0]);
    } catch (error) {
      res.status(500).json({ message: 'Failed to add the card', error: error });
    }
  });

  // GET /cards - Retrieve all cards
router.get('/', async (req, res) => {
    const db = getDb();
    try {
      const collection = db.collection('cards');
      const cards = await collection.find({}).toArray();
      res.status(200).json(cards);
    } catch (error) {
      res.status(500).json({ message: 'Failed to retrieve cards', error: error });
    }
  });
  
  // PUT /cards/:id - Update a specific card
  router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, rarity, type } = req.body;
    const db = getDb();
    try {
      const collection = db.collection('cards');
      const result = await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { name, rarity, type } }
      );
      if (result.modifiedCount === 1) {
        res.status(200).json({ message: 'Card updated successfully' });
      } else {
        res.status(404).json({ message: 'Card not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Failed to update the card', error: error });
    }
  });
  
  // DELETE /cards/:id - Delete a specific card
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const db = getDb();
    try {
      const collection = db.collection('cards');
      const result = await collection.deleteOne({ _id: new ObjectId(id) });
      if (result.deletedCount === 1) {
        res.status(200).json({ message: 'Card deleted successfully' });
      } else {
        res.status(404).json({ message: 'Card not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete the card', error: error });
    }
  });
  
export default router;
  