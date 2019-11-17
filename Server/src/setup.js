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
    runsqlfile("src/create_tables.sql", pool, () => {
      runsqlfile("src/create_testdata.sql", pool);
    })
};


