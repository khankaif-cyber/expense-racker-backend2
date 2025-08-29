const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://khankaifcom551:Khan123Kaif@cluster0.6elaksp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect(); // Connect to MongoDB
    await client.db("admin").command({ ping: 1 }); // Ping the DB
    console.log("✅ Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
