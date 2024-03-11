const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");

const MongoClient = require("mongodb").MongoClient;

const corsConfig = {
  origin: true,
};

const app = express();
app.use(cors(corsConfig));

// Connection URL
const url =
  "mongodb+srv://revanthravella:revanthrishi@cluster02.6rpnf5u.mongodb.net/?retryWrites=true&w=majority&appName=cluster02";

// Connection URL

// Database Name
const dbName = "myproject";

// Create a new MongoClient
const client = new MongoClient(url);

async function run() {
  try {
    // Connect the client to the server
    await client.connect();

    console.log("Connected correctly to server");

    // Specify the database to use
    const db = client.db("Insights_Data");

    // Specify the collection to use
    const col = db.collection("insights");

    // Perform a find query
    const docs = await col.find().toArray();

    console.log("Data retrieved successfully"); // Updated log message

    // Define the API route
    app.get("/api/data", async (req, res) => {
      try {
        // Assuming `docs` contains the data fetched from MongoDB

        // Set CORS headers
        // res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // Allow requests from this origin
        // res.header(
        //   "Access-Control-Allow-Origin",
        //   "https://data-dashboard-nine.vercel.app/"
        // ); // Allow requests from this origin
        // res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE"); // Specify allowed HTTP methods
        // res.header("Access-Control-Allow-Headers", "Content-Type"); // Specify allowed headers

        res.json(docs); // Send data as JSON response
      } catch (err) {
        console.error("Error fetching data:", err);
        res.status(500).json({ error: "Internal server error" });
      }
    });
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);

require("dotenv").config();

if (process.env.PORT === undefined) {
  console.error("Error: PORT environment variable is not set in .env file.");
  process.exit(1); // Terminate the process if PORT is not set
}

if (process.env.HOSTNAME === undefined) {
  console.error(
    "Error: HOSTNAME environment variable is not set in .env file."
  );
  process.exit(1); // Terminate the process if HOSTNAME is not set
}

const port = process.env.PORT || 5000;
const hostname = process.env.HOSTNAME || "localhost";

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
