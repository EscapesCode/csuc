const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "bhlpnjceuoedswv68x6l-mysql.services.clever-cloud.com",
  user: "ukgc2nkh0jiymvfu",
  password: "oUQYCiiZEqu6Xm63LYYD",
  database: "bhlpnjceuoedswv68x6l",
});

module.exports = pool;
