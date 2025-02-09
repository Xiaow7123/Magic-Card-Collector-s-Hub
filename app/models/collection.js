import getDb from './db';

class Collection {
    constructor(userId) {
        // Use the MongoDB-assigned _id from the user document
        this.userId = userId;  
        this.db = getDb();
        // This is the MongoDB collection for storing user collections
        this.collection = this.db.collection('collections');  
    }

    async addCard(card) {
        // Adds a card to this user's collection
        return await this.collection.updateOne(
            { userId: this.userId },
            { $push: { cards: card } },
            { upsert: true }
        );
    }

    async removeCard(cardId) {
        // Removes a card from this user's collection by card ID
        return await this.collection.updateOne(
            { userId: this.userId },
            { $pull: { cards: { id: cardId } } }
        );
    }

    async getCards() {
        // Retrieves all cards in this user's collection
        const result = await this.collection.findOne({ userId: this.userId });
        return result ? result.cards : [];
    }

    async findCard(criteria) {
        // Find a card by criteria within this user's collection
        const result = await this.collection.findOne({ userId: this.userId, 'cards.id': criteria.id });
        return result ? result.cards.find(card => card.id === criteria.id) : null;
    }
}

export default Collection;
