// deckController.js
import Deck from '../models/Deck';

export const createDeck = async (req, res) => {
    const userId = req.user._id; // Assuming user ID is extracted from authenticated session
    const deckData = req.body;

    try {
        const deck = new Deck(userId);
        const result = await deck.createDeck(deckData);
        res.status(201).json({ message: "Deck created successfully", deckId: result.insertedId });
    } catch (error) {
        res.status(500).json({ message: "Failed to create deck", error: error.message });
    }
};

// updateDeck
export const updateDeck = async (req, res) => {
    const deckId = req.params.deckId;
    const deckData = req.body;

    try {
        const deck = new Deck(req.user._id);
        const result = await deck.updateDeck(deckId, deckData);
        if (result.modifiedCount > 0) {
            res.status(200).json({ message: "Deck updated successfully" });
        } else {
            res.status(404).json({ message: "Deck not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Failed to update deck", error: error.message });
    }
};

// getDeck
export const getDeck = async (req, res) => {
    const deckId = req.params.deckId;

    try {
        const deck = new Deck(req.user._id);
        const result = await deck.getDeck(deckId);
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: "Deck not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve deck", error: error.message });
    }
}

// deleteDeck
export const deleteDeck = async (req, res) => {
    const deckId = req.params.deckId;

    try {
        const deck = new Deck(req.user._id);
        const result = await deck.deleteDeck(deckId);
        if (result.deletedCount > 0) {
            res.status(200).json({ message: "Deck deleted successfully" });
        } else {
            res.status(404).json({ message: "Deck not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Failed to delete deck", error: error.message });
    }
}

// listDecks would follow a similar structure.
export const listDecks = async (req, res) => {
    const userId = req.user._id; // Assuming user ID is extracted from authenticated session

    try {
        const deck = new Deck(userId);
        const result = await deck.listDecks();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve decks", error: error.message });
    }
}


