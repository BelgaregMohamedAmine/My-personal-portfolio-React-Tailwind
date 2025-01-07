-- Step 1: Create the database
CREATE DATABASE testcleiningsql;
GO

-- Step 2: Switch to the new database
USE testcleiningsql;
GO

--------------------------------------------------------------------
----------------------1.Removing Irrelevant Data--------------------------
---------------------------------------------------------------------
Drop table customers

-- Creating a sample table for demonstration
CREATE TABLE customers (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    year INT,
    country VARCHAR(50),
    state VARCHAR(50)
);

-- Sample data insertion
INSERT INTO customers (id, name, email, year, country, state)
VALUES
(1, 'John Doe', 'john.doe@example.com', 2022, 'US', 'CA'),
(2, 'Jane Smith', 'jane.smith@example.com', 2023, 'US', 'NY'),
(3, 'Alice Johnson', 'alice.johnson@example.com', 2023, 'Canada', 'ON');

-- Check the table after deletion
SELECT * FROM customers;

-- Query to remove irrelevant data
DELETE FROM customers WHERE country <> 'US';

-- Check the table after deletion
SELECT * FROM customers;

--------------------------------------------------------------------
----------------------2. Removing Duplicate Data--------------------------
---------------------------------------------------------------------
DROP TABLE  employees

-- Creating a sample table with duplicates
CREATE TABLE employees (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    department VARCHAR(50),
    hire_date DATE
);

-- Sample data insertion
INSERT INTO employees (id, name, department, hire_date)
VALUES
(1, 'Alice', 'HR', '2023-01-01'),
(2, 'Bob', 'IT', '2023-02-01'),
(3, 'Alice', 'HR', '2023-01-01');  -- Duplicate

-- Check the table befor deletion
SELECT * FROM employees;

-- Finding duplicate values based on name, department, and hire_date
SELECT 
    name, 
    department, 
    hire_date, 
    COUNT(*) AS duplicate_count
FROM 
    employees
GROUP BY 
    name, 
    department, 
    hire_date
HAVING 
    COUNT(*) > 1;

-- Removing duplicates using GROUP BY and HAVING
DELETE FROM employees
WHERE id NOT IN (
    SELECT MIN(id)
    FROM employees
    GROUP BY name, department, hire_date
);

-- Check the table after deletion
SELECT * FROM employees;


--------------------------------------------------------------------
----------------------3. Do Type Conversion--------------------------
---------------------------------------------------------------------

-- 1. Creating the products table with structural errors
CREATE TABLE products (
    product_id INT PRIMARY KEY,
    product_name VARCHAR(100),
    price DECIMAL(10, 2),
    category VARCHAR(50)
);

-- 2. Inserting data with errors
INSERT INTO products (product_id, product_name, price, category)
VALUES
(1, 'apple iphone', 999.99, 'Electronics'),
(2, 'SAMSUNG TV', NULL, 'electronics'),  -- Inconsistent capitalization and NULL value
(3, 'Sony Headphones', 199.99, 'Entertainment');

-- Checking the products table befor corrections
SELECT * FROM products;

-- 3. Correcting capitalization and NULL values
UPDATE products
SET 
    -- Correcting the capitalization of the product name
    product_name = CONCAT(UPPER(LEFT(product_name, 1)), LOWER(SUBSTRING(product_name, 2, LEN(product_name) - 1))),
    -- Correcting the capitalization of the category
    category = CONCAT(UPPER(LEFT(category, 1)), LOWER(SUBSTRING(category, 2, LEN(category) - 1))),
    -- Replacing NULL values in the price with 0.00
    price = COALESCE(price, 0.00);

-- 4. Checking the products table after corrections
SELECT * FROM products;

--------------------------------------------------------------------
----------------------4. Do Type Conversion--------------------------
---------------------------------------------------------------------
DROP TABLE transactions

-- Create a transactions table
CREATE TABLE transactions (
    transaction_id INT PRIMARY KEY,
    amount VARCHAR(20),
    transaction_date VARCHAR(20)
);

-- Insert sample data with issues
INSERT INTO transactions (transaction_id, amount, transaction_date)
VALUES
(1, '$100.00', '2023-01-15'),
(2, '50.50', '2023-02-01');


-- Show the data in the transactions table
SELECT * FROM transactions;

-- Remove the $ sign from the `amount` column
UPDATE transactions
SET amount = REPLACE(amount, '$', '');

-- Show the data in the transactions table
SELECT * FROM transactions;

-- Change `amount` from text to a number
ALTER TABLE transactions
ALTER COLUMN amount DECIMAL(10, 2);

-- Show the data in the transactions table
SELECT * FROM transactions;

-- Change `transaction_date` from text to a date
ALTER TABLE transactions
ALTER COLUMN transaction_date DATE;

-- Show the data in the transactions table
SELECT * FROM transactions;

-- Look at the structure of the transactions table
EXEC sp_help 'transactions';

-- Show the data in the transactions table
SELECT * FROM transactions;



--------------------------------------------------------------------
----------------------5. Handle Missing Data ------------------------
---------------------------------------------------------------------
DROP TABLE orders
-- Create an orders table
CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    amount DECIMAL(10, 2)
);

-- Insert sample data with a missing amount
INSERT INTO orders (order_id, amount)
VALUES
(1, 150.00),
(2, NULL),  -- Missing amount
(3, 300.00);

-- Show the data in the orders table before replacing missing values
SELECT * FROM orders;

-- Replace missing values with 0.00
UPDATE orders
SET amount = COALESCE(amount, 0.00);


-- Show the data in the orders table after replacing missing values
SELECT * FROM orders;

--------------------------------------------------------------------
----------------------6. Deal with Outliers -------------------------
---------------------------------------------------------------------
DROP TABLE sales_data
-- Create a sales_data table
CREATE TABLE sales_data (
    sale_id INT PRIMARY KEY,
    amount DECIMAL(10, 2)
);

-- Insert sample data with potential outliers
INSERT INTO sales_data (sale_id, amount)
VALUES
(1, 100.00),
(2, 150.00),
(3, 200.00),
(4, 10.00),   -- Possible outlier
(5, 1000.00); -- Possible outlier


SELECT * FROM sales_data


-- Calculate IQR and identify outliers
WITH stats AS (
    SELECT
        PERCENTILE_CONT(0.25) WITHIN GROUP (ORDER BY amount) OVER () AS q1,
        PERCENTILE_CONT(0.75) WITHIN GROUP (ORDER BY amount) OVER () AS q3
    FROM sales_data
    -- Use DISTINCT to ensure we get only one row in the result
    GROUP BY amount
),
iqr AS (
    SELECT q1, q3, (q3 - q1) AS iqr
    FROM stats
    -- Use DISTINCT to ensure we get only one row in the result
    GROUP BY q1, q3
)
SELECT *
FROM sales_data
JOIN iqr
ON 1=1 -- Cartesian join to include IQR in the output
WHERE amount < (iqr.q1 - 1.5 * iqr.iqr) OR amount > (iqr.q3 + 1.5 * iqr.iqr);


--------------------------------------------------------------------
------------------7. Standardize/Normalize Data  -------------------
---------------------------------------------------------------------
DROP TABLE  sales_data 

-- Create a sales_data table
CREATE TABLE sales_data (
    order_id INT PRIMARY KEY,
    amount DECIMAL(10, 2),
    currency VARCHAR(3)
);

-- Insert sample data
INSERT INTO sales_data (order_id, amount, currency)
VALUES
(1, 100.00, 'USD'),
(2, 85.00, 'EUR'),
(3, 75.00, 'GBP'),
(4, 5000.00, 'JPY'),
(5, 130.00, 'USD');


-- Convert amounts to USD
UPDATE sales_data
SET amount = CASE 
    WHEN currency = 'EUR' THEN amount * 1.1  -- Assume 1 EUR = 1.1 USD
    WHEN currency = 'GBP' THEN amount * 1.3  -- Assume 1 GBP = 1.3 USD
    WHEN currency = 'JPY' THEN amount * 0.009  -- Assume 1 JPY = 0.009 USD
    ELSE amount
END,
currency = 'USD';

-- Normalize data to a 0-1 range
WITH stats AS (
    SELECT MIN(amount) AS min_amount, MAX(amount) AS max_amount FROM sales_data
)
SELECT order_id,
  (amount - stats.min_amount) / (stats.max_amount - stats.min_amount) AS normalized_amount
FROM sales_data, stats;


----------------------------------------------------------------------
------------------------8. Validate Data -----------------------------
-----------------------------------------------------------------------
DROP TABLE  sales_data 

-- Create a sales_data table
CREATE TABLE sales_data (
    order_id INT PRIMARY KEY,
    customer_id INT,
    amount DECIMAL(10, 2),
    order_date DATE
);

-- Insert sample data
INSERT INTO sales_data (order_id, customer_id, amount, order_date)
VALUES
(1, 101, 150.00, '2023-08-01'),
(2, 102, NULL, '2023-08-15'),  -- Missing amount
(3, 103, 200.00, '2024-10-01'),  -- Future date
(4, 104, 120.50, '2023-07-15');


-- Validate data to ensure it meets business rules
SELECT order_id, customer_id, order_date,
  CASE
    WHEN amount IS NULL THEN 'Invalid Amount'
    WHEN order_date > GETDATE() THEN 'Future Date'
    ELSE 'Valid'
  END AS validation_status
FROM sales_data;
