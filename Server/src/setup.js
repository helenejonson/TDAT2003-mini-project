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

  global.__MONGOD__ =
    runsqlfile("dao/create_tables.sql", pool, () => {
      runsqlfile("dao/create_testdata.sql", pool, f);
    });
};

function f() {
  console.log("yes");
}


