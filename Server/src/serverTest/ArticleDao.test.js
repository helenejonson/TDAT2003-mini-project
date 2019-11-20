var mysql = require("mysql");

const ArticleDao = require("../database/ArticleDao.js");
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




let articleDao = new ArticleDao(pool);





    test("get all articles from db", done => {
        function callback(status, data) {
            console.log(
                "Test callback: status=" + status + ", data.length=" + data.length
            );
            expect(data.length).toBeGreaterThanOrEqual(4);
            done();
        }

        articleDao.getArticles(callback);
    });

    test("get all important articles from db", done => {
        function callback(status, data) {
            console.log(
                "Test callback: status=" + status + ", data.length=" + data.length
            );
            expect(data.length).toBe(3);
            done();
        }

        articleDao.getImportant(callback);
    });

    test("get full newsfeed from db", done => {
        function callback(status, data) {
            console.log(
                "Test callback: status=" + status + ", data.length=" + data.length
            );
            expect(data.length).toBeGreaterThanOrEqual(4);
            done();
        }

        articleDao.getNewsfeed(callback);
    });

    test("get all articles in category from db", done => {
        function callback(status, data) {
            console.log(
                "Test callback: status=" + status + ", data.length=" + data.length
            );
            expect(data.length).toBe(2);
            done();
        }

        articleDao.getCategory('D&D', callback);
    });

    test("get one article from db", done => {
        function callback(status, data) {
            console.log(
                "Test callback status=" + status + ", data=" + JSON.stringify(data)
            );
            expect(data.length).toBe(1);
            expect(data[0].title).toBe("tittel 1");
            done();
        }

        articleDao.getArticle(1, callback);
    });

    test("delete one", done => {
        var before = -1;
        articleDao.getArticles(some);

        function some(status, data) {
            console.log("Test callback: status=" + status + ", data.length=" + data.length
            );
            before = data.length;
            articleDao.deleteArticle(2, callback);
        }

        function callback(status, data) {
            console.log("Test callback: status=" + status + ", data.length=" + JSON.stringify(data)
            );
            expect(data.affectedRows).toBe(1);
            articleDao.getArticles(after)
        }

        function after(status, data) {
            console.log("Test callback: status=" + status + ", data.length=" + data.length
            );
            expect(data.length).toBe(before - 1);
            done();
        }
    });

    test("add article to db", done => {
        function callback(status, data) {
            console.log(
                "Test callback: status=" + status + ", data=" + JSON.stringify(data)
            );
            expect(data.affectedRows).toBeGreaterThanOrEqual(1);
            done();
        }

        articleDao.createArticle(
            {
                title: "New title",
                picturePath: "New path",
                pictureAlt: "New alt",
                pictureCapt: "New capt",
                text: "New text",
                author: "My Name",
                category: "Movies",
                importance: 2
            },
            callback
        );
    });

    test("update rating", done => {
        function callback(status, data) {
            console.log(
                "Test callback: status=" + status + ", data=" + JSON.stringify(data)
            );
            expect(data.affectedRows).toBeGreaterThanOrEqual(1);
            done();
        }

        articleDao.updateRating(
            {likes: 2, dislikes: 1, id: 1}
            , callback);
    });

    test("Ask for none-existent article from db", done => {
        function callback(status, data) {
            console.log(
                "Test callback: status=" + status + ", data=" + JSON.stringify(data)
            );
            expect(data.length).toBe(0);
            done();
        }

        articleDao.getArticle(0, callback);
    });


