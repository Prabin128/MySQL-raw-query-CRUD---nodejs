// SQL Operator with WHERE Clause  

const dbConnection = require('../connection');
const express =  require('express');
const app = express();
const bodyparser = require('body-parser');
app.use(bodyparser.json());



                                        // 10. SQL WHERE Clause

/*WHERE Clause in MySQL is a keyword used to specify the exact criteria of data or rows that will be affected by the specified SQL statement. 
The WHERE clause can be used with SQL statements like INSERT, UPDATE, SELECT, and DELETE to filter records and 
perform various operations on the data.
*/

                                        // 10.1. Arithmetic Operator 

// 10.1.1. "="  Operator
app.get('/equaltooperator', (req, res) => {
    let sql =  `SELECT StuName, Address, Phone 
                FROM Student 
                WHERE StuName = "Susan ADK" `;
    dbConnection.query(sql, (err, result) => {
        if (err) throw err; 
        res.send(result);
    });
});

//10.1.2. "!=" Operator   ==>  	Checks if the values of two operands are equal or not, if values are not equal then condition becomes true.
// 10.1.3. "<>" Operator  ==> this is similar to "!=" operator.
app.get('/notequaltooperator', (req, res) => {
    let sql =  `SELECT *
                FROM Student 
                WHERE StuName != 'Rabin Pokhrel' `;
    dbConnection.query(sql, (err, result) => {
        if (err) throw err; 
        res.send(result);
    });
});

//// 10.1.4. ">" Operator  ==> Checks if the value of left operand is greater than the value of right operand, if yes then condition becomes true.
app.get('/greaterthanoperator', (req, res) => {
    let sql =  `SELECT *
                FROM Student 
                WHERE StuName != 'Rabin Pokhrel' `; 
    dbConnection.query(sql, (err, result) => {
        if (err) throw err; 
        res.send(result);
    });
});


// Similary Arithmetic Operators are  : +, -, =, >, < , => , <= , <>, !<, >!

                                                // 10.2. LOGICAL OPERATOR
// 10.2.1. AND and OR Operator
app.get('/andoroperator', (req, res) => {
    let sql =  `SELECT *
                FROM Student 
                WHERE StuMArks = 100 AND Department = 'IT' OR Dateofbirth = 2023 `; 
    dbConnection.query(sql, (err, result) => {
        if (err) throw err; 
        res.send(result);
    });
});

app.listen('3000', () => {
    console.log("SERVER STARTED ON PORT 3000");

});





