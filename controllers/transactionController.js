// controllers/transactionController.js

const db = require('../models/transaction');

// Get all transactions
exports.getAllTransactions = (req, res) => {
    db.all('SELECT * FROM transactions', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(rows);
    });
};

// Add a new transaction
exports.addTransaction = (req, res) => {
    const { type, category, amount, date, description } = req.body;

    if (!type || !category || !amount || !date) {
        return res.status(400).json({ message: 'All fields except description are required' });
    }

    const query = `INSERT INTO transactions (type, category, amount, date, description) 
                   VALUES (?, ?, ?, ?, ?)`;

    db.run(query, [type, category, amount, date, description], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Transaction added successfully!', id: this.lastID });
    });
};

// Get a transaction by ID
exports.getTransactionById = (req, res) => {
    const { id } = req.params;

    db.get('SELECT * FROM transactions WHERE id = ?', [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        res.status(200).json(row);
    });
};

// Update a transaction
exports.updateTransaction = (req, res) => {
    const { id } = req.params;
    const { type, category, amount, date, description } = req.body;

    const query = `UPDATE transactions 
                   SET type = ?, category = ?, amount = ?, date = ?, description = ? 
                   WHERE id = ?`;

    db.run(query, [type, category, amount, date, description, id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        res.status(200).json({ message: 'Transaction updated successfully' });
    });
};

// Delete a transaction
exports.deleteTransaction = (req, res) => {
    const { id } = req.params;

    db.run('DELETE FROM transactions WHERE id = ?', [id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        res.status(200).json({ message: 'Transaction deleted successfully' });
    });
};

exports.getSummary = (req, res) => {
    db.get(`SELECT COUNT(*) AS count FROM transactions`, [], (err, row) => {
        if (err) {
            console.error("DB Error:", err);  // Log error
            return res.status(500).json({ error: err.message });
        }

        // Check if count is 0 and return a message if no transactions exist
        if (row.count === 0) {
            return res.status(404).json({ message: "No transactions found" });
        }

        console.log("Query result:", row);  // Log query result
        res.status(200).json(row);  // Return the count
    });
};


// Get all categories
exports.getAllCategories = (req, res) => {
    db.all('SELECT * FROM categories', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(rows);
    });
};

// Add a new category
exports.addCategory = (req, res) => {
    const { name, type } = req.body;

    if (!name || !type) {
        return res.status(400).json({ message: 'Both name and type are required' });
    }

    const query = `INSERT INTO categories (name, type) VALUES (?, ?)`;

    db.run(query, [name, type], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Category added successfully!', id: this.lastID });
    });
};

// Update a category
exports.updateCategory = (req, res) => {
    const { id } = req.params;
    const { name, type } = req.body;

    const query = `UPDATE categories SET name = ?, type = ? WHERE id = ?`;

    db.run(query, [name, type, id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json({ message: 'Category updated successfully' });
    });
};

// Delete a category
exports.deleteCategory = (req, res) => {
    const { id } = req.params;

    db.run('DELETE FROM categories WHERE id = ?', [id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json({ message: 'Category deleted successfully' });
    });
};