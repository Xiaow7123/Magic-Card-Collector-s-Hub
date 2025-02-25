//import required modules
import express from 'express';
import { connectDB } from '../db/mongo.js';
//import { config } from '../config/config';
//import { closeDB } from '../db/mongo.js';
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
router.post('/', async (req, res) => {
    console.log("Attempting to add a card", req.body);
    
    // Validate the card data
    const { error, value } = cardSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: 'Validation failed', error: error.details });
    }

    const { name, rarity, type } = value;
    try {
      const db = await connectDB();
      const collection = db.collection('cards');
      const result = await collection.insertOne({ name, rarity, type });
      res.status(201).json(result.ops[0]);
    } catch (error) {
      res.status(500).json({ message: 'Failed to add the card', error: error });
    } 
  });

  // GET /cards - Retrieve all cards
router.get('/', async (req, res) => {
    try {
      const db = await connectDB();
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
    // Validate the card data
    const { error, value } = cardSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: 'Validation failed', error: error.details });
    }

    const { name, rarity, type } = value;
    try {
      const db = await connectDB();
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
    try {
      const db = connectDB();
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
  