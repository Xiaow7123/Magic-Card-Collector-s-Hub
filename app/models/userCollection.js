
// UserCollection.js
import { getDb } from './db';

class UserCollection {
    constructor(userId) {
        this.userId = userId;
        this.db = getDb();
        this.collection = this.db.collection('userCollections');
    }

    async addOrUpdateCard(cardData) {
        const { cardId, quantity, source } = cardData;
        // Update the existing card or add a new one
        const result = await this.collection.updateOne(
            { userId: this.userId, "cards.cardId": cardId },
            { $set: { "cards.$.quantity": quantity, "cards.$.source": source } },
            { upsert: true }
        );
        if (result.matchedCount === 0) {
            return await this.collection.updateOne(
                { userId: this.userId },
                { $push: { cards: { cardId, quantity, source } } },
                { upsert: true }
            );
        }
        return result;
    }

    async deleteCard(cardId) {
        return await this.collection.updateOne(
            { userId: this.userId },
            { $pull: { cards: { cardId } } }
        );
    }

    async getCards() {
        const document = await this.collection.findOne({ userId: this.userId });
        return document ? document.cards : [];
    }

    async findCard(cardId) {
        const document = await this.collection.findOne(
            { userId: this.userId, "cards.cardId": cardId },
            { projection: { "cards.$": 1 } }
        );
        return document && document.cards.length > 0 ? document.cards[0] : null;
    }
}

export default UserCollection;
