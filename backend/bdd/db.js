const mySql = require('mysql2')
 
const pool = mySql.createPool({
    host: 'localhost',
    user: 'root',
    port: 8889,
    password: 'root',
    database: 'ecomm-beaute'
});


const con = pool.promise();

module.exports = con