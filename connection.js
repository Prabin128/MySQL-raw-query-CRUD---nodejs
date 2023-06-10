const mysql = require('mysql');



//Create connection 
const dbConnection = mysql.createConnection ({

    host : 'localhost',
    user: 'root',
    password: 'root',
    database: 'nodemysqlcrud'      
});

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


module.exports = dbConnection;