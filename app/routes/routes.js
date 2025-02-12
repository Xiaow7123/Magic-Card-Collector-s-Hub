import express from 'express';
const router = express.Router();

// import controllers 
import cardController from '../controllers/cardController';
import collectionController from '../controllers/collectionController';
import userController from '../controllers/userController';
import deckController from '../controllers/deckController';
import userCollectionController from '../controllers/userCollectionController';
import authenticateUser from '../middlewares/authenticateUser';


// card routes
router.post('/cards', cardController.createCard);
router.get('/cards', cardController.getAllCards);
router.get('/cards/:id', cardController.getCardById);
router.put('/cards/:id', cardController.updateCard);
router.delete('/cards/:id', cardController.deleteCard);

// collection routes
router.post('/users/:userId/collections/cards', authenticateUser, collectionController.addOrUpdateCard);
router.delete('/users/:userId/collections/cards/:cardId', authenticateUser, collectionController.removeCard);
router.get('/users/:userId/collections/cards', authenticateUser, collectionController.getAllCards);
router.get('/users/:userId/collections/cards/:cardId', authenticateUser, collectionController.getCard);

// user routes
router.post('/users', userController.createUser);
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

// deck routes
router.post('/decks', deckController.createDeck);
router.get('/decks', deckController.getAllDecks);
router.get('/decks/:id', deckController.getDeckById);
router.put('/decks/:id', deckController.updateDeck);
router.delete('/decks/:id', deckController.deleteDeck);

// user collection routes
router.post('/user-collections', userCollectionController.createUserCollection);
router.get('/user-collections', userCollectionController.getAllUserCollections);
router.get('/user-collections/:id', userCollectionController.getUserCollectionById);
router.put('/user-collections/:id', userCollectionController.updateUserCollection);
router.delete('/user-collections/:id', userCollectionController.deleteUserCollection);

// export the router
export default router;