const dbConnection = require('../connection');
const express =  require('express');
const app = express();
const bodyparser = require('body-parser');
app.use(bodyparser.json());


                                            //create TAble in Database    
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



                                            //SQL INSERT INTO STATEMENT    ==> Two Ways 

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
                        (7, "AMrit BAkabal", "Shankhapur", "8888888888"),
                        (8, "Prakash Acharya", "Skngr", "9867936023"),
                        (9, "Bijju Dai", "NEpathya college", "9867796046"); ` ;

    dbConnection.query(sql,  (err, result) => {   
    if (err) throw err;
    console.log(result);
    res.send('Students' + ' ' + 'added....');
    });
});


                                    //SELECT STATEMENT
//SELECT Statement is used to selecct the data from the database

//Selecting all the columns from the database 
app.get('/getallstudents', (req,res) => {
    let sql = `SELECT * FROM Student `;
    dbConnection.query(sql, ( err, result) => {
        if(err) throw err;
        res.send(result);

    })
})




app.listen('3000', () => {
    console.log("server started on port 3000");

});



