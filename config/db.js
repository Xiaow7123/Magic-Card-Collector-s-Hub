import { MongoClient } from 'mongodb';


// MongoClient: part of MongoDB's node.js driver to connect to my MongoDB database
// This should be My MongoDB Atlas connection string or local MongoDB URI
const uri = "My_mongodb_connection_string_here"; 
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

let dbConnection;

export default {
    // establish the database connection and sets the dbConnection variable
    connectToServer: function (callback) {
        client.connect(function (err, db) {
            if (err || !db) {
                return callback(err);
            }

            // Change 'My_database_name' to my database name
            dbConnection = db.db("My_database_name"); 
            console.log("Successfully connected to MongoDB.");
            return callback(null, dbConnection);
        });
    },
    // provide access to the database connection for use in other files
    getDb: function () {
        return dbConnection;
    }
};
