
# Transaction Management API

This project is a simple Node.js-based RESTful API for managing transactions and categories. The API allows users to perform CRUD (Create, Read, Update, Delete) operations on transactions and categories using SQLite as the database.

## Features

- Add, update, delete, and view transactions.
- Add, update, delete, and view categories.
- SQLite database for data storage.
- RESTful API for easy interaction.

## Table of Contents

- [Technologies](#technologies)
- [Setup Instructions](#setup-instructions)
- [API Endpoints](#api-endpoints)
  - [Transaction Endpoints](#transaction-endpoints)
  - [Category Endpoints](#category-endpoints)
- [Database Setup](#database-setup)
- [Postman Configuration](#postman-configuration)

## Technologies

- **Node.js**: JavaScript runtime for server-side code execution.
- **Express.js**: Web framework for Node.js to build the API.
- **SQLite**: Lightweight relational database used to store transactions and categories.
- **Postman**: API development and testing tool.

## Setup Instructions

1. **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Create and configure the SQLite database**:
    - Ensure your database file is set up correctly in the `models/transaction.js` file.
    - Refer to [Database Setup](#database-setup) for more details.

4. **Run the server**:
    ```bash
    npm start
    ```

   The server will be running on `http://localhost:3000`.

## API Endpoints

### Transaction Endpoints

- **Get all transactions**:  
  `GET /transactions`  
  Example Response:
  ```json
  [
    {
      "id": 1,
      "type": "Income",
      "category": "Salary",
      "amount": 5000,
      "date": "2023-10-01",
      "description": "October salary"
    }
  ]
  ```

- **Get transaction by ID**:  
  `GET /transactions/:id`  
  Example Response:
  ```json
  {
    "id": 1,
    "type": "Income",
    "category": "Salary",
    "amount": 5000,
    "date": "2023-10-01",
    "description": "October salary"
  }
  ```

- **Add a transaction**:  
  `POST /transactions`  
  Request Body:
  ```json
  {
    "type": "Income",
    "category": "Salary",
    "amount": 5000,
    "date": "2023-10-01",
    "description": "October salary"
  }
  ```
  Example Response:
  ```json
  {
    "message": "Transaction added successfully!",
    "id": 1
  }
  ```

- **Update a transaction**:  
  `PUT /transactions/:id`  
  Request Body:
  ```json
  {
    "type": "Expense",
    "category": "Food",
    "amount": 100,
    "date": "2023-10-02",
    "description": "Lunch"
  }
  ```
  Example Response:
  ```json
  {
    "message": "Transaction updated successfully"
  }
  ```

- **Delete a transaction**:  
  `DELETE /transactions/:id`  
  Example Response:
  ```json
  {
    "message": "Transaction deleted successfully"
  }
  ```

### Category Endpoints

- **Get all categories**:  
  `GET transactions/categories`  
  Example Response:
  ```json
  [
    {
      "id": 1,
      "name": "Salary",
      "type": "Income"
    }
  ]
  ```

- **Add a category**:  
  `POST transactions/categories`  
  Request Body:
  ```json
  {
    "name": "Food",
    "type": "Expense"
  }
  ```
  Example Response:
  ```json
  {
    "message": "Category added successfully!",
    "id": 1
  }
  ```

- **Update a category**:  
  `PUT transactions/categories/:id`  
  Request Body:
  ```json
  {
    "name": "Groceries",
    "type": "Expense"
  }
  ```
  Example Response:
  ```json
  {
    "message": "Category updated successfully"
  }
  ```

- **Delete a category**:  
  `DELETE transactions/categories/:id`  
  Example Response:
  ```json
  {
    "message": "Category deleted successfully"
  }
  ```

## Database Setup

1. Make sure SQLite is installed in your environment.
2. Create a `transactions` table and `categories` table in the SQLite database:

```sql
CREATE TABLE transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL,
    category TEXT NOT NULL,
    amount REAL NOT NULL,
    date TEXT NOT NULL,
    description TEXT
);

CREATE TABLE categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    type TEXT NOT NULL
);
```

3. Ensure your SQLite database file is properly linked in the `models/transaction.js` file.

## Postman Configuration

You can test the API using Postman:

- **Get All Transactions**:
  - Method: `GET`
  - URL: `http://localhost:3000/transactions`
  
- **Add Transaction**:
  - Method: `POST`
  - URL: `http://localhost:3000/transactions`
  - Body:
    ```json
    {
      "type": "Income",
      "category": "Salary",
      "amount": 5000,
      "date": "2023-10-01",
      "description": "October salary"
    }
    ```

- **Update Transaction**:
  - Method: `PUT`
  - URL: `http://localhost:3000/transactions/1`
  - Body:
    ```json
    {
      "type": "Expense",
      "category": "Groceries",
      "amount": 200,
      "date": "2023-10-02",
      "description": "Groceries shopping"
    }
    ```

- **Delete Transaction**:
  - Method: `DELETE`
  - URL: `http://localhost:3000/transactions/1`

## License

This project is licensed under the MIT License.
