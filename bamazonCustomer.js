const mysql = require('mysql');
const inquirer = require('inquirer');
const Table = require('cli-table3');

const db = mysql.createConnection({
    host: "localhost", 
    port: "3306",
    user: "root",
    password: "password",
    database: "bamazon_db"
});

db.connect(function (err) {
    if(err) throw err;
    console.log("connected as id : ", db.threadId);
    showItems();
});

function showItems() {
    db.query("SELECT * FROM products", function (err, res) {
        var table = new Table({
            head: ["Item ID", "Product Name", "Department Name", "Price", "Quantity"],
            colWidths: [10, 30, 30, 10, 10]

    });
    for (let i = 0; i < res.length; i++) {
        table.push(
            [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].quantity]
        );
    }
    console.log()
}