// SQL Operator with WHERE Clause  

const dbConnection = require('../connection');
const express =  require('express');
const app = express();
const bodyparser = require('body-parser');
app.use(bodyparser.json());



                                        // 5. SQL WHERE Clause

/*WHERE Clause in MySQL is a keyword used to specify the exact criteria of data or rows that will be affected by the specified SQL statement. 
The WHERE clause can be used with SQL statements like INSERT, UPDATE, SELECT, and DELETE to filter records and 
perform various operations on the data.
*/

                                        // 5.1. Arithmetic Operator 

// 5.1.1. "="  Operator
app.get('/equaltooperator', (req, res) => {
    let sql =  `SELECT StuName, Address, Phone 
                FROM Student 
                WHERE StuName = "Susan ADK" `;
    dbConnection.query(sql, (err, result) => {
        if (err) throw err; 
        res.send(result);
    });
});

//5.1.2. "!=" Operator   ==>  	Checks if the values of two operands are equal or not, if values are not equal then condition becomes true.
// 5.1.3. "<>" Operator  ==> this is similar to "!=" operator.
app.get('/notequaltooperator', (req, res) => {
    let sql =  `SELECT *
                FROM Student 
                WHERE StuName != 'Rabin Pokhrel' `;
    dbConnection.query(sql, (err, result) => {
        if (err) throw err; 
        res.send(result);
    });
});




app.listen('3000', () => {
    console.log("SERVER STARTED ON PORT 3000");

});





