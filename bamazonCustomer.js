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
    if (err) throw err;
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
        console.log(table.toString());

        setTimeout(purchase, 1000);
    });
};

function purchase() {
    inquirer.prompt([
        {
            name: "item_id",
            type: "input",
            message: "Please select item id."
        },
        {
            name: "quantity",
            type: "input",
            message: "How many would you like?"
        }
    ]).then(function (input) {
        db.query("SELECT * FROM products WHERE item_id = ?", input.item_id, function (err, res) {
            if(err) throw err;

            if(!res.length) {
                console.log("Sorry, we do not have that item in our inventory.  Please try again");
                for (let i = 0; i < 5; i++) {
                    console.log("\r\n");
                };
                return purchase();
            };

            if(parseInt(input.quantity) > parseInt(res[0].stock_quantity)) {
                console.log("Sorry, we do not have that amount at this time.  Please try again.");
                return purchase(); 
            };

            var newQuantity = parseInt(res[0].stock_quantity) - parseInt(input.quantity);
            var subTotal = parseFloat(res[0].price) * parseInt(input.quantity);

            db.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?", [ newQuantity, input.item_id ], function (err, res) {
                if (err) throw err;

                console.log(`Your total is $${subTotal}.  Thank you for your purchase!`);

                db.end();
                
            })
        })
    })
}