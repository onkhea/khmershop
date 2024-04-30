const express = require("express");
const sql = require("mssql/msnodesqlv8");
const cors = require("cors");
const app = express();
const port = 3400;
const query = "SELECT TOP 100 name, description, price, quantity FROM Item";
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

// GET method to fetch all items
app.get("/api/items", async (req, res) => {
  try {
    // Connect to the database
    await sql.connect(config);

    // Query
    const result = await sql.query(query);

    // Send the result as JSON
    res.json(result.recordset);
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    // Close the connection pool
    await sql.close();
  }
});

// POST method to create a new item
app.post("/api/items", async (req, res) => {
  const newItem = req.body;
  try {
    // Connect to the database
    await sql.connect(config);

    // Insert the new item
    const result = await sql.query(`INSERT INTO Item (name, description, price, quantity) VALUES ('${newItem.name}', '${newItem.description}', ${newItem.price}, ${newItem.quantity})`);

    // Send a success message
    res.status(201).send("Item created successfully");
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    // Close the connection pool
    await sql.close();
  }
});

// PUT method to update an existing item
app.put("/api/items/:id", async (req, res) => {
  const itemId = req.params.id;
  const updatedItem = req.body;
  try {
    // Connect to the database
    await sql.connect(config);

    // Update the item
    const result = await sql.query(`UPDATE Item SET name = '${updatedItem.name}', description = '${updatedItem.description}', price = ${updatedItem.price}, quantity = ${updatedItem.quantity} WHERE id = ${itemId}`);

    // Send a success message
    res.status(200).send("Item updated successfully");
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    // Close the connection pool
    await sql.close();
  }
});

// DELETE method to delete an item
app.delete("/api/items/:id", async (req, res) => {
  const itemId = req.params.id;
  try {
    // Connect to the database
    await sql.connect(config);

    // Delete the item
    const result = await sql.query(`DELETE FROM Item WHERE id = ${itemId}`);

    // Send a success message
    res.status(200).send("Item deleted successfully");
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    // Close the connection pool
    await sql.close();
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
