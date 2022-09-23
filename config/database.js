const {createPool} = require('mysql');

const pool = createPool({
    
    port:3306,
    host:"sql6.freemysqlhosting.net",
    user:"sql6521840",
    password:"t6qCumpZaS",
    database:"sql6521840",
    connectionLimit:10
});

pool.getConnection(function(err, connection) {
    if (err) {
        return console.log(err.message);
      }
  });

module.exports = pool;

