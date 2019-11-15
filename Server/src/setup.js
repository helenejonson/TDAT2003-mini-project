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

beforeAll(done => {
  runsqlfile("src/create_tables.sql", pool, () => {
    runsqlfile("src/create_testdata.sql", pool, done);
  })
});