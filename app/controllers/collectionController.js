// focus on managing interactiion with the HTTP client and UserCollection model 
import UserCollection from '../models/UserCollection';

// Adds a new card to the collection or updates an existing one
export const addOrUpdateCard = async (req, res) => {
    const userId = req.params.userId;
    const { cardId, quantity, source } = req.body;

    try {
        const userCollection = new UserCollection(userId);
        const result = await userCollection.addOrUpdateCard({ cardId, quantity, source });

        if (result.matchedCount > 0 || result.upsertedCount > 0) {
            res.status(201).json({ message: "Card added or updated successfully", data: result });
        } else {
            res.status(400).json({ message: "No updates made to the collection" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Deletes a card from the collection
export const deleteCard = async (req, res) => {
    const userId = req.params.userId;
    const cardId = req.params.cardId;

    try {
        const userCollection = new UserCollection(userId);
        const result = await userCollection.deleteCard(cardId);

        if (result.deletedCount > 0) {
            res.status(200).json({ message: "Card deleted successfully" });
        } else {
            res.status(404).json({ message: "Card not found in the collection" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Retrieves all cards in the user's collection
export const getCards = async (req, res) => {
    const userId = req.params.userId;

    try {
        const userCollection = new UserCollection(userId);
        const cards = await userCollection.getCards();

        if (cards.length > 0) {
            res.status(200).json({ data: cards });
        } else {
            res.status(404).json({ message: "No cards found in the collection" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Finds a specific card in the user's collection
export const findCard = async (req, res) => {
    const userId = req.params.userId;
    const cardId = req.params.cardId;

    try {
        const userCollection = new UserCollection(userId);
        const card = await userCollection.findCard(cardId);

        if (card) {
            res.status(200).json({ data: card });
        } else {
            res.status(404).json({ message: "Card not found in the collection" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};