var mysql = require("mysql");

const CategoryDao = require("../database/CategoryDao.js");
const runsqlfile = require("./runsqlfile");

/*
var pool = mysql.createPool({
    connectionLimit: 4,
    host: "mysql.stud.iie.ntnu.no",
    user: "heleneyj",
    password: "aX3SR1kc",
    database: "heleneyj",
    debug: false,
    multipleStatements: true
});

 */



var pool = mysql.createPool({
    connectionLimit: 1,
    host: "mysql",
    user: "root",
    password: "secret",
    database: "supertestdb",
    debug: false,
    multipleStatements: true
});



let categoryDao = new CategoryDao(pool);




    test("get all categories from db", done => {
        function callback(status, data) {
            console.log(
                "Test callback: status=" + status + ", data.length=" + data.length
            );
            expect(data.length).toBeGreaterThanOrEqual(5);
            done();
        }

        categoryDao.getCategories(callback);
    });