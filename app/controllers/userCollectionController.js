import UserCollection from '../models/UserCollection';

export const addOrUpdateCard = async (req, res) => {
    const { userId } = req.params;
    const { cardId, quantity, source } = req.body;

    try {
        const userCollection = new UserCollection(userId);
        const result = await userCollection.addOrUpdateCard({ cardId, quantity, source });
        res.status(200).json({ message: "Card updated successfully", data: result });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const deleteCard = async (req, res) => {
    const { userId, cardId } = req.params;

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

// Additional controller methods for getCards and findCard would be defined similarly.
export const getCards = async (req, res) => {
    const { userId } = req.params;

    try {
        const userCollection = new UserCollection(userId);
        const cards = await userCollection.getCards();
        res.status(200).json({ data: cards });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const findCard = async (req, res) => {
    const { userId, cardId } = req.params;

    try {
        const userCollection = new UserCollection(userId);
        const card = await userCollection.findCard(cardId);
        if (card) {
            res.status(200).json({ data: card });
        } else {
            res.status(404).json({ message: "Card not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}