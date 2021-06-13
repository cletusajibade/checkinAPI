'use strict';
const mysql = require('mysql2');
//local mysql db connection 
const dbConn = mysql.createConnection({
    connectionLimit : 1000,
    host     : 'localhost',
     user     : 'root',
     password : '',
     database : 'ckeckin',
     port: '3306',
     debug    :  false
});
dbConn.connect(function(err) {
  if (err) throw err;
  console.log("Database Connected!");
});
module.exports = dbConn;
