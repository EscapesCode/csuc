const mysql = require("mysql2");

// db production 
const pool = mysql.createPool({
  host: "bhlpnjceuoedswv68x6l-mysql.services.clever-cloud.com",
  user: "ukgc2nkh0jiymvfu",
  password: "oUQYCiiZEqu6Xm63LYYD",
  database: "bhlpnjceuoedswv68x6l",
});

// db dev
// const pool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "csuc_db",
// });

module.exports = pool;
