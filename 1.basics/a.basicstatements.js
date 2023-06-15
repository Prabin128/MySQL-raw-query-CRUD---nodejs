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

                                            //2. SQL DROP TABLE Statement

//The DROP TABLE statement is used to drop an existing table in a database. 
app.get('/droptable', (req, res) => {
    let sql = `DROP TABLE stud;`;
    dbConnection.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('stud table deleted succesfully.... ');
    });
});


                                            //3. SQL ALTER TABLE Statement

//The ALTER TABLE statement is used to add, delete, or modify columns and also used to add and drop various constraints in an existing table.

//3.1.  ==> ALTER TABLE - ADD Column    ==> Trying to create additional columns as "Department" "StuMarks" in existing Student Table.
app.get('/dropcolumn', (req, res) => {
    let sql = `ALTER TABLE Student
               DROP COLUMN willdropinfuture`;
    dbConnection.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Column "willdropinfuture" deleted  succesfully.... ');
    });
});

//3.2.  ==> ALTER TABLE - DROP COLUMN   ==> Trying to delete column "willdropinfuture" form existing Student Table 
app.get('/altertable', (req, res) => {
    let sql = ` ALTER TABLE Student
                ADD StuMArks VARCHAR(45) default null,
                ADD Department VARCHAR(45) default null,
                ADD DOB date,
                ADD willdropinfuture VARCHAR(45) default null;  `;
    dbConnection.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Columns added succesfully.... ');
    });
});

// 3.3.  ==> ALTER TABLE - ALTER/MODIFY DATATYPE  ==> Trying to change the datatype of dOB form date to year
app.get('/renamecolumn', (req, res) => {
    let sql = ` ALTER TABLE Student
                RENAME COLUMN DOB to Dateofbirth;  `;
    dbConnection.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Columns renamed succesfully.... ');
    });
});

// 3.4. ==> ALTER TABLE - ALTER/MODIFY DATATYPE  ==> Trying to modify the datatype of Dateofbirth from date to year
app.get('/modifydatatype', (req, res) => {
    let sql = ` ALTER TABLE Student
                MODIFY COLUMN Dateofbirth year `;
    dbConnection.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Columns renamed succesfully.... ');
    });
});

                                            // 4. SQL INSERT INTO STATEMENT    ==> Two Ways 

// 4.1. Specify both the column names and values be inserted:  

     /* Syntax : INSERT INTO table_name (column1, column2, column3, ...)
               VALUES (value1, value2, value3, ...); */

app.get('/insertstudentsdetails', (req, res) => {

    let sql = ` INSERT INTO Student (
                        StuName, Address, Phone, StuMArks, Department, Dateofbirth
                    ) 
                VALUES
                     ("Nitish Neupane", "MAnigram", "9867936043", 100, IT, 2000),
                     ("Prakash Acharya", "Shankhanagar", "9867936044" 80, Science, 1999),
                     ("Rabin Pokhrel", "Devinagar", "9867936045", 70, Maths, 1880),
                     ("Susan ADK", "Butwal", "9867936046", 81, IT, 2021); ` ;

    dbConnection.query(sql,  (err, result) => {   
        if (err) throw err;
        console.log(result);
        res.send('Students' + ' ' + 'added....');
    });
});

// 4.2. Specify only the Values 

/*  If you are inserting all the values for all the columns of the table, then we dont have to specify the columns name. 
    But the order of the values is in the same order as columns in the table.
    Remember => Id also should be mentioned if we are not specifying the column name 
                Syntax: INSERT INTO table_name
                        VALUES (value1, value2, value3, ...);   */

app.get('/insertstudent', (req, res) => {
    let sql = ` INSERT INTO Student 
                VALUES
                    (6, "Abhishek Adhikari", "Saljhandi", "9999999999",  81, Science, 2021),
                    (7, "AMrit BAkabal", "Shankhapur", "8888888888",  81, Science, 2022),
                    (8, "Prakash Acharya", "Skngr", "9867936023",  81, Maths, 2023),
                    (9, "Bijju Dai", "NEpathya college", "9867796046",  81, IT, 2024); ` ;

    dbConnection.query(sql,  (err, result) => {   
        if (err) throw err;
        console.log(result);
        res.send('Students' + ' ' + 'added....');
    });
});


                                   // 5. Change/Modify the value of Multiple Columns in the table  




                                            // 6. SELECT STATEMENT
//SELECT * Statement is used to select the data from the database

//Selecting all the columns from the database 
app.get('/getallstudents', (req,res) => {
    let sql = `SELECT * FROM Student `;                       // "SELECT * " for selecting all the columns from the table.
    dbConnection.query(sql, ( err, result) => {
        if(err) throw err;
        res.send(result);

    });
});


                                            // 7. SQL SELECT DISTINCT Statement

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

                                            //8. SELECT INTO Statement

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


                                        // 9. SQL WHERE Clause

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

 



