import bcrypt from 'bcrypt';
import { getDb } from './db';



class User {
    constructor({ username, email, password }) {
        this.username = username;
        this.email = email;
        this.password = password; // Note: Store hashed passwords only
    }
    /**
        * Hashes the user's password using bcrypt.
        * This method should be called before saving the user to the database.
        * @returns {Promise<void>} A promise that resolves when the password has been hashed.
    */

    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }

    async save() {
        const db = getDb();
        await this.hashPassword(); // Ensure the password is hashed before saving to database
        return db.collection('users').insertOne(this);
    }
    /**
        * Finds a user by their username.
        * @param {string} username - The username of the user to find.
        * @returns {Promise<Object|null>} A promise that resolves to the user object if found, or null if not found.
    */
    static async findByUsername(username) {
        const db = getDb();
        return db.collection('users').findOne({ username });
    }

    static async validatePassword(username, password) {
        const user = await User.findByUsername(username);
        return user && await bcrypt.compare(password, user.password);
    }
}

export default User;
