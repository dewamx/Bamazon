DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;
CREATE TABLE products(
    item_id INT AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(30),
    department_name VARCHAR(50),
    price DECIMAL(10,2),
    stock_quantity INT,
    PRIMARY KEY(item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES('tide', 'grocery', 2.00, 50);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES('apple', 'grocery', 5.00, 50);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES('orange', 'grocery', 12.00, 50);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES('banana', 'grocery', 6.00, 50);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES('carrot', 'grocery', 3.00, 50);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES('watermelon', 'grocery', 12.00, 50);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES('water', 'grocery', 5.00, 50);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES('milk', 'grocery', 3.00, 50);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES('chicken', 'grocery', 15.00, 50);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES('steak', 'grocery', 20.00, 50);

SELECT * FROM products;
