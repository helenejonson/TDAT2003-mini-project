var mysql = require("mysql");

const CategoryDao = require("./CategoryDao.js");
const runsqlfile = require("./runsqlfile");

var pool = mysql.createPool({
    connectionLimit: 4,
    host: "mysql.stud.iie.ntnu.no",
    user: "heleneyj",
    password: "aX3SR1kc",
    database: "heleneyj",
    debug: false
});

let CategoryDao = new CategoryDao(pool);

beforeAll(done => {
    runsqlfile("dao/create_tables.sql", pool, () => {
        runsqlfile("dao/create_testdata.sql", pool, done);
    })
});

afterAll(() => {
    pool.end();
});

test("get all categories from db", done => {
    function callback(status, data) {
        console.log(
            "Test callback: status=" + status + ", data.length=" + data.length
        );
        expect(data.length).toBeGreaterThanOrEqual(5);
        done();
    }

    CategoryDao.getCategories(callback);
});