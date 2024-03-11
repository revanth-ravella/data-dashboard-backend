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
// let docs;

const setupData = async () => {
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
    return docs;
  } catch (err) {
    console.log(err);
  }
};

// Define the API route

app.get("/", (req, res) => {
  console.log("requstttttrt");
  res.send("HELLO");
});

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
    const docs = setupData();
    res.json(docs); // Send data as JSON response
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

const port = 5000;
const hostname = "0.0.0.0";

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
