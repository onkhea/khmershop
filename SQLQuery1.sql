-- Generate and execute 1000 insert statements
DECLARE @counter INT = 1;

WHILE @counter <= 1000
BEGIN
    INSERT INTO Item (name, description, price, quantity)
    VALUES (
        CONCAT('Item ', @counter),
        CONCAT('Description of Item ', @counter),
        ROUND(RAND() * 100, 2),  -- Random price between 0 and 100 rounded to 2 decimal places
        ROUND(RAND() * 100, 0)   -- Random quantity between 0 and 100 rounded to 0 decimal places (integer)
    );
    
    SET @counter = @counter + 1;
END
CREATE TABLE Item (
    id INT PRIMARY KEY IDENTITY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    quantity INT NOT NULL DEFAULT 0,
    created_at DATETIME2 DEFAULT GETDATE(),
    updated_at DATETIME2 DEFAULT GETDATE()
);
