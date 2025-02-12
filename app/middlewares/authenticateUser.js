// middleware/authenticateUser.js
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

dotenv.config();

const authenticateUser = (req, res, next) => {
    // Get the token from the request header
    const token = req.header('Authorization') ? req.header('Authorization').replace('Bearer ', '') : null;

    if (!token) {
        return res.status(401).json({ message: 'Authentication token is missing' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // JWT_SECRET is the secret key used to sign the JWT
        req.user = decoded; // Add the decoded user information to the request object
        next(); // Move to the next middleware/function in the stack
    } catch (error) {
        res.status(401).json({ message: 'Invalid token', error: error.message });
    }
};

export default authenticateUser;
