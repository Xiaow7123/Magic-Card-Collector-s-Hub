//import required modules
import express from 'express';
import { connectDB } from '../db/mongo.js';
import { ObjectId } from 'mongodb';
import Joi from 'joi';


//write API endpoints 
// create a new card 

const router = express.Router();

const cardSchema = Joi.object({
  name: Joi.string().required(),
  rarity: Joi.string().required(),
  type: Joi.string().required()
});


// POST /cards - Create a new card
router.post('/create', async (req, res) => {
  const { error, value } = cardSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: 'Validation failed', details: error.details.map(x => x.message) });
  }
  try {
    const db = await connectDB();
    const collection = db.collection('cards');
    const result = await collection.insertOne(value);
    if (!result.insertedId) {
      throw new Error('Insert failed');
    }
    const newCard = await collection.findOne({ _id: result.insertedId });
    res.status(201).json(newCard);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add the card', error: error.toString() });
  }
});


  // GET /cards - Retrieve all cards
router.get('/list', async (req, res) => {
    try {
      const db = await connectDB();
      const collection = db.collection('cards');
      const cards = await collection.find({}).toArray();
      res.status(200).json(cards);
    } catch (error) {
      res.status(500).json({ message: 'Failed to retrieve cards', error: error });
    } 
  });
  
  
  // DELETE /cards/:id - Delete a specific card
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const db = await connectDB();
      const collection = db.collection('cards');
      const result = await collection.deleteOne({ _id: new ObjectId(id) });
      if (result.deletedCount === 0) {
        res.status(404).json({ message: 'Card not found' });
      } else {
        res.status(200).json({ message: 'Card deleted successfully' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete the card', error: error });
    } 
  });
  
export default router;
  