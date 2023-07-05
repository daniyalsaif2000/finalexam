const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

// Create a MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "internet1",
  database: "daniyal", // Change the database name to 'daniyal'
});

// Connect to the database
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connected to the MySQL database");
});

// Create the Express application
const app = express();
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(cors()); // Enable CORS

// Serve the HTML file
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Fetch all records from the database
app.get("/records", (req, res) => {
  const query = "SELECT * FROM register";
  db.query(query, (err, results) => {
    if (err) {
      throw err;
    }
    res.json(results);
  });
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
