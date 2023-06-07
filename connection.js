const mysql = require('mysql');



//Create connection 
const dbConnection = mysql.createConnection ({

    host : 'localhost',
    user: 'root',
    password: 'root',
    database: 'nodemysqlcrud'      
});


module.exports = dbConnection;