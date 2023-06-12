// CReating Table 2. Inserting the data 3. SELECT Statement 

const dbConnection = require('../connection');
const express =  require('express');
const app = express();
const bodyparser = require('body-parser');
app.use(bodyparser.json());


                                            // 1. Create TAble in Database    
app.get('/studenttable', (req, res) => {
    let sql = `CREATE TABLE Student(
                            StuID int(11) NOT NULL auto_increment, 
                            StuName VARCHAR(45) default null, 
                            Address VARCHAR(45) default null, 
                            Phone VARCHAR(45) default null,
                            PRIMARY KEY(StuID) 
                ) `;
    dbConnection.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Student table created.... ');
    });
});



                                            // 2. SQL INSERT INTO STATEMENT    ==> Two Ways 

//1. Specify both the column names and values be inserted:  

     /* Syntax : INSERT INTO table_name (column1, column2, column3, ...)
               VALUES (value1, value2, value3, ...); */

app.get('/insertstudentsdetails', (req, res) => {

    let sql = ` INSERT INTO Student (
                        StuName, Address, Phone
                    ) 
                VALUES
                     ("Nitish Neupane", "MAnigram", "9867936043"),
                     ("Prakash Acharya", "Shankhanagar", "9867936044"),
                     ("Rabin Pokhrel", "Devinagar", "9867936045"),
                     ("Susan ADK", "Butwal", "9867936046"); ` ;

    dbConnection.query(sql,  (err, result) => {   
        if (err) throw err;
        console.log(result);
        res.send('Students' + ' ' + 'added....');
    });
});

//2. Specify only the Values 

/*  If you are inserting all the values for all the columns of the table, then we dont have to specify the columns name. 
    But the order of the values is in the same order as columns in the table.
    Remember => Id also should be mentioned if we are not specifying the column name 
                Syntax: INSERT INTO table_name
                        VALUES (value1, value2, value3, ...);   */

app.get('/insertstudent', (req, res) => {
        let sql = ` INSERT INTO Student 
                    VALUES
                        (6, "Abhishek Adhikari", "Saljhandi", "9999999999"),
                        (7, "Abhishek Adhikari", "Shankhapur", "8888888888"),
                        (8, "Prakash Acharya", "Skngr", "9867936023"),
                        (9, "Prakash Acharya", "NEpathya college", "9867796046"); ` ;

    dbConnection.query(sql,  (err, result) => {   
    if (err) throw err;
    console.log(result);
    res.send('Students' + ' ' + 'added....');
    });
});


                                            // 3. SELECT STATEMENT
//SELECT * Statement is used to select the data from the database

//Selecting all the columns from the database 
app.get('/getallstudents', (req,res) => {
    let sql = `SELECT * FROM Student `;                       // "SELECT * " for selecting all the columns from the table.
    dbConnection.query(sql, ( err, result) => {
        if(err) throw err;
        res.send(result);

    });
});


                                            // 4. SQL SELECT DISTINCT Statement

/* The SELECT DISTINCT statement is used to return only distinct (different) values.
Inside a table, a column often contains many duplicate values; and sometimes you only want to list the different (distinct) values. 
                    SELECT DISTINCT Syntax:  SELECT DISTINCT column1, column2, ...  FROM table_name; 
*/
app.get('/selectdistinct', (req, res) => {
    let sql = `SELECT DISTINCT StuName, Phone FROM Student`
    dbConnection.query(sql, (err, result) => {
        if(err) throw err;
        res.send(result);
    });
});

                                            //5. SELECT INTO Statement

/*
The SELECT INTO statement copies data from one table into a new table.                                           
MySQL does not support SELECT INTO [table]. It only supports SELECT INTO [variable] and can only do this one variable at a time.
Similar query can be performed by below query..

However, it's important to note that the SELECT INTO and also the below mentioned statement does not 
preserve any indexes, constraints, or other properties of the original table, 
and the new table will not have any primary keys or foreign keys defined by default. 
Therefore, you may need to add these properties to the new table manually if necessary.
*/
  
app.get('/copyingToAnotherDatabase', (req, res) => {
    //MEthod 1
    //let sql = `SELECT * FROM nodemysqlcrud.stud;`;

    //Method 2
    let sql = `CREATE table Stud1 as SELECT StuName, Phone FROM Student;`;  // we can select particular column while copying to another table
    dbConnection.query(sql, (err, result) => {
        if(err) throw err;
        res.send(result);
    });
});

                                        // 5. SQL WHERE Clause
app.get('/studentWhereCondition', (req, res) => {
    let sql =  `SELECT StuName, Address, Phone [IN externaldb]
                FROM Student 
                WHERE StuName = "Susan ADK" `;
    dbConnection.query(sql, (err, result) => {
        if (err) throw err; 
        res.send(result);
    })
}) 




app.listen('3000', () => {
    console.log("server started on port 3000");

});

 



