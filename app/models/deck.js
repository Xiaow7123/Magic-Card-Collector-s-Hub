import { getDb } from './db';

export class deck {
    constructor(userId) {
        this.db = getDb();
        this.userId = userId;
        this.collection = this.db.collection('decks');
    }

    async createDeck(deckData) {
        const { name, description, cards } = deckData;
        const newDeck = {
            userId: this.userId,
            name,
            description,
            cards: cards.map(card => ({
                cardId: card.cardId,
                quantity: card.quantity,
                owned: card.owned || 0 // This can track how many of the card the user actually owns
            })),
            createdAt: new Date()
        };
        return await this.collection.insertOne(newDeck);
    }

    async updateDeck(deckId, updates) {
        const { name, description, cards } = updates;
        return await this.collection.updateOne(
            { _id: deckId, userId: this.userId },
            { $set: { name, description, cards } }
        );
    }

    async getDeck(deckId) {
        return await this.collection.findOne({ _id: deckId, userId: this.userId });
    }

    async deleteDeck(deckId) {
        return await this.collection.deleteOne({ _id: deckId, userId: this.userId });
    }

    async listDecks() {
        return await this.collection.find({ userId: this.userId }).toArray();
    }
}


export default deck;