/*----------------interact with the User model to perform CRUD operations----------------*/


import User from '../models/user';

// Create a new user and save it to the database
export const createUser = async (req, res) => {
    try {
        // Create a new user
        const user = new User(req.body);
        // Save the user to the database
        await user.save();
        // Send the user back to the client
        // Http status code 201 means created
        res.status(201).send({ user });
    } catch (error) {
        res.status(400).send(error);
    }
};

// Get a user by username
export const getUser = async (req, res) => {
    try {
        // Find the user by username
        const user = await User.findByUsername(req.params.username);
        // If the user is not found, send a 404 error
        if (!user) {
            return res.status(404).send();
        }
        // Send the user back to the client
        res.send({ user });
    } catch (error) {
        // If there is an error, send a 500 error
        res.status(500).send(error);
    }
};

//update a user by username 
exports.updateUser = async (req, res) => {
    try {
        // updates is an array of the keys in the request body
        const updates = Object.keys(req.body);
        // allowedUpdates is an array of the keys that are allowed to be updated
        const allowedUpdates = ['email', 'password'];
        // Check if the updates are valid
        const isValidOperation = updates.every((update) =>
            allowedUpdates.includes(update)
        );
        // If the updates are not valid, send a 400 error
        if (!isValidOperation) {
            return res.status(400).send({ error: 'Invalid updates!' });
        }
        // Find the user by username
        const user = await User.findByUsername(req.params.username);
        // If the user is not found, send a 404 error
        if (!user) {
            return res.status(404).send();
        }
        // Update the user with the new values
        updates.forEach((update) => (user[update] = req.body[update]));
        // Save the user to the database
        await user.hashPassword();
        // Send the user back to the client
        await user.save();
        // Send the user back to the client
        res.send({ user });
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete a user by username
exports.deleteUser = async (req, res) => {
        try {
            const user = await User.findByUsername(req.params.username);
            if (!user) {
                return res.status(404).send();
            }

            await User.deleteUser(req.params.username);
            res.send({ message: 'User deleted successfully' });
        } catch (error) {
            res.status(500).send(error: error.message);
        }
    };