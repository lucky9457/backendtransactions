// models/transaction.js

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/sqlite.db', (err) => {
    if (err) {
        console.error('Error connecting to the database', err.message);
    } else {
        console.log('Connected to the SQLite database');
    }
});

// Initialize the tables
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        type TEXT CHECK(type IN ('income', 'expense')) NOT NULL
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        type TEXT CHECK(type IN ('income', 'expense')) NOT NULL,
        category TEXT NOT NULL,
        amount REAL NOT NULL,
        date TEXT NOT NULL,
        description TEXT,
        FOREIGN KEY (category) REFERENCES categories(name)
    )`);
});

module.exports = db;
