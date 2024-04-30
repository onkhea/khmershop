// Import required modules
const express = require("express");
const sql = require("mssql/msnodesqlv8");
const cors = require("cors");
const app = express();
const config = {
  server: "DESKTOP-RT74UAD\\KHEA",
  driver: "msnodesqlv8",
  database: "CRM",
  options: {
    trustedConnection: true,
  },
};
app.use(cors());
app.use(express.json());

// Define routes
app.get('/customers', async (req, res) => {
  try {
    // Connect to MSSQL database
    await sql.connect(config);

    // Query to retrieve all customers from the database
    const result = await sql.query`SELECT * FROM Customers`;

    // Send the retrieved customers as JSON response
    res.json(result.recordset);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving customers');
  } finally {
    // Close MSSQL database connection
    await sql.close();
  }
});

app.get('/products', async (req, res) => {
  try {
    // Connect to MSSQL database
    await sql.connect(config);

    // Query to retrieve all products from the database
    const result = await sql.query`SELECT * FROM Products`;

    // Send the retrieved products as JSON response
    res.json(result.recordset);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving products');
  } finally {
    // Close MSSQL database connection
    await sql.close();
  }
});

app.get('/orders', async (req, res) => {
  try {
    // Connect to MSSQL database
    await sql.connect(config);

    // Query to retrieve all orders from the database
    const result = await sql.query`SELECT * FROM Orders`;

    // Send the retrieved orders as JSON response
    res.json(result.recordset);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving orders');
  } finally {
    // Close MSSQL database connection
    await sql.close();
  }
});

app.post('/orders', async (req, res) => {
  const { CustomerID, OrderDate, TotalAmount } = req.body;
  try {
    // Connect to MSSQL database
    await sql.connect(config);

    // Query to insert a new order into the database
    await sql.query`INSERT INTO Orders (CustomerID, OrderDate, TotalAmount) VALUES (${CustomerID}, ${OrderDate}, ${TotalAmount})`;

    // Send success response
    res.status(201).send('Order created successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating order');
  } finally {
    // Close MSSQL database connection
    await sql.close();
  }
});

// Start the server
const PORT = process.env.PORT || 3010;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
