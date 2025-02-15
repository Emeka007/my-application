const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Connect to SQLite database (or create if it doesn't exist)
const db = new sqlite3.Database("./database.sqlite", (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log("Connected to SQLite database.");
        db.run(`CREATE TABLE IF NOT EXISTS items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);
    }
});

// CRUD Operations

// Create
app.post("/add", (req, res) => {
    const { name, description } = req.body;
    db.run(`INSERT INTO items (name, description) VALUES (?, ?)`, [name, description], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID });
    });
});

// Read
app.get("/items", (req, res) => {
    db.all(`SELECT * FROM items`, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Delete
app.delete("/delete/:id", (req, res) => {
    const { id } = req.params;
    db.run(`DELETE FROM items WHERE id = ?`, id, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Deleted successfully" });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
