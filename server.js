// server.js

const express = require('express');
const bodyParser = require('body-parser');
const transactionRoutes = require('./routes/transactions');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use('/transactions', transactionRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
