var mysql = require("mysql");

const CommentDao = require("./CommentDao.js");
const runsqlfile = require("./runsqlfile");

/*
var pool = mysql.createPool({
    connectionLimit: 9,
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

let commentDao = new CommentDao(pool);

beforeAll(done => {
    runsqlfile("src/create_tables.sql", pool, () => {
        runsqlfile("src/create_testdata.sql", pool, done);
    })
});

afterAll(() => {
    pool.end();
});

describe('lalala', () => {
    test("get all comments to article from db", done => {
        function callback(status, data) {
            console.log(
                "Test callback: status=" + status + ", data.length=" + data.length
            );
            expect(data.length).toBe(2);
            done();
        }

        commentDao.getComments(1, callback);
    });

    test("add comment to db", done => {
        function callback(status, data) {
            console.log(
                "Test callback: status=" + status + ", data=" + JSON.stringify(data)
            );
            expect(data.affectedRows).toBeGreaterThanOrEqual(1);
            done();
        }

        commentDao.createComment(
            {articleId: 1, username: 'Bunde', text: 'Ny kommentar'},
            callback
        );
    });

    test("get none-existent from db", done => {
        function callback(status, data) {
            console.log(
                "Test callback: status=" + status + ", data.length=" + data.length
            );
            expect(data.length).toBe(0);
            done();
        }

        commentDao.getComments(7, callback);
    });

    test("delete comments to article", done => {
        var before = -1;
        commentDao.getComments(3, some);

        function some(status, data) {
            console.log("Test callback: status=" + status + ", data.length=" + data.length
            );
            before = data.length;
            commentDao.deleteComment(3, callback);
        }

        function callback(status, data) {
            console.log("Test callback: status=" + status + ", data.length=" + JSON.stringify(data)
            );
            expect(data.affectedRows).toBe(1);
            commentDao.getComments(3, after)
        }

        function after(status, data) {
            console.log("Test callback: status=" + status + ", data.length=" + data.length
            );
            expect(data.length).toBe(before - 1);
            done();
        }
    });
});