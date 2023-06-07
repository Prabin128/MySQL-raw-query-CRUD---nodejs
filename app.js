const dbConnection = require('./connection')
const express =  require('express');
const app = express();
const bodyparser = require('body-parser');
app.use(bodyparser.json());



//connecting to the created database i.e "nodemysqlcrud"
dbConnection.connect((err) => {
    if(!err){
        console.log('Mysql Database connected Succesfully....');
    }else {
        // By passing undefined, the default behavior of JSON.stringify() is used, which includes all properties in the JSON string.
        //By passing 2, it means that the JSON string will be formatted with two spaces for each level of indentation, making it more human-readable.
        console.log('Database Connection Failed \n Error :' +JSON.stringify(err, undefined, 2));  
    }  
});



//Fetching all employees from the database               
app.get('/employees', (req, res) => { // Defining route

    dbConnection.query('SELECT * FROM Employee', (err, rows, fields) => {
        if(!err){
            //console.log(rows);
            //console.log(rows[0].Name);  /// this way we can access any thing from the database 
            res.send(rows);
        }else{
            console.log(err);
        }
    });
});


//Get employee By ID

app.get('/employees/:id', (req, res) => { // Defining route

    dbConnection.query('SELECT * FROM Employee WHERE EmpID = ?',[req.params.id], (err, rows, fields) => {
        if(!err){
            //console.log(rows);
            //console.log(rows[0].Name);  /// this way we can access any thing from the database 
            res.send(rows);
        }else{
            console.log(err);
        }
    });
});

// //Create DB               // route define gareko
// app.get('/createdb', (req, res) => {
//     let sql = 'CREATE DATABASE nodemysqlcrud';
//     db.query(sql, (err, result) => {
//         if(err) throw err;
//         console.log(result);
//         res.send('Database created....');
//     });
// });

// // //create table      // another route creating 
// // app.get('/createpoststable', (req, res) => {
// //     let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id) ) ';
// //     db.query(sql, (err, result) => {
// //         if(err) throw err;
// //         console.log(result);
// //         res.send('Post table created.... ');
// //     });
// // });

// // //insert the data in post table ...   insert post 1
// // app.get('/addpost1', (req, res) => {
// //     let post = {title: 'Post one', body : 'This is post one'};  // creating our data 
// //     let sql = 'INSERT INTO posts SET?';  //creating our query
// //     let query = db.query(sql, post, (err, result) => {   //db.query and pass "sql" and this SET ? ,here question-mark is like a placeholder for what we put in 2nd argument i.e in "post"So we put there as an actual data i.e "post" 
// //         if (err) throw err;
// //         console.log(result);
// //         res.send('Post 1 added....');
// //     });
// // });

// // //insert post 2 
// // app.get('/addpost2', (req, res) => {
// //     let post = {title: 'Post two', body: 'this is post two'};
// //     let sql = 'INSERT INTO posts SET?';
// //     let query = db.query(sql, post, (err, result) => {
// //         if (err) throw err;
// //         console.log(result);
// //         res.send('Post 2 created....');
// //     });
// // });

// // // select all the post from the table
// // app.get('/getposts', (req, res) => {
// //     let sql = 'SELECT * FROM posts';
// //     let query = db.query(sql, (err, results) => {
// //         if (err) throw err;
// //         console.log(results);
// //         res.send('ALL the Posts fetched....')
        
// //     });
// // });

// // // select single/individual post from the table
// // app.get('/getposts/:id', (req, res) => {   // here in  "/:id", we are going to put actual id in URL
// //     let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`; //for our query, we are going to use variable i.e " id as 1,2.. " so we use backtick instead of normal one coz that allows us to use a variable in query
// //                                             // mathiko req.params.id chai url ma vako " getpost/id" ma vako id ko value taanera.. query ko tei id ko value select garera display gardinxa...
// //     let query = db.query(sql, (err, result) => {
// //         if (err) throw err;
// //         console.log(result);
// //         res.send('Posts fetched....')
        
// //     });
// // });

// // //update our posts
// // app.get('/updateposts/:id', (req, res) => {   // here in  "/:id", we are going to put actual id in URL
// //     let newTitle = 'Updated Title';
// //     let sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`; //for our query, we are going to use variable i.e " id as 1,2.. " so we use backtick instead of normal one coz that allows us to use a variable in query
// //                                             // mathiko req.params.id chai url ma vako " getpost/id" ma vako id ko value taanera.. query ko tei id ko value select garera display gardinxa...
// //     let query = db.query(sql, (err, result) => {
// //         if (err) throw err;
// //         console.log(result);
// //         res.send('Posts Updated....')
        
// //     });
// // });

// // //delte post 
// // app.get('/deleteposts/:id', (req, res) => {
// //     let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
// //     let query = db.query (sql, (err, result) => {
// //         if (err) throw err;
// //         console.log(result);
// //         res.send('Post deleted..');
// //     });
// // });

app.listen('3000', () => {
    console.log("server started on port 3000");

});