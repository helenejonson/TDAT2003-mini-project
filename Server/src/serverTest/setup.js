var mysql = require("mysql");
const runsqlfile = require("./runsqlfile");

var pool = mysql.createPool({
  connectionLimit: 1,
  host: "mysql",
  user: "root",
  password: "secret",
  database: "supertestdb",
  debug: false,
  multipleStatements: true
});

module.exports = async () => {
  runsqlfile("src/serverTest/create_tables.sql", pool, () => {
    runsqlfile("src/serverTest/create_testdata.sql", pool, f);
  });
  global.__MONGOD__ = pool;

};

function f() {
  console.log("yes");
}


