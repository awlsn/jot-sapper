const url = require("url");
const MongoClient = require("mongodb").MongoClient;

// Create cached connection variable
let cachedDb = null;

async function connectToDatabase(uri) {
  // If the database connection is cached,
  // use it instead of creating a new connection
  if (cachedDb) {
    return cachedDb;
  }

  // If no connection is cached, create a new one
  const client = await MongoClient.connect(uri, { useNewUrlParser: true });

  // Select the database through the connection,
  // using the database path of the connection string
  const db = await client.db(url.parse(uri).pathname.substr(1));

  // Cache the database connection and return the connection
  cachedDb = db;
  return db;
}

module.exports = async (req, res) => {
  // Get a database connection, cached or otherwise,
  // using the connection string environment variable as the argument
  const db = await connectToDatabase(process.env.MONGO_URI);

  // Select the "users" collection from the database
  const collection = await db.collection("data");

  // Select the users collection from the database
  const data = await collection.find({}).toArray();

  // Respond with a JSON string of all users in the collection
  res.status(200).json({ data });
};

/* 
module.exports = (req, res) => {
  const { body } = req;
  res.send(body);
};
 */
