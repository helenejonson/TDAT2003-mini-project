var mysql = require("mysql");

const ArticleDao = require("./ArticleDao.js");
const runsqlfile = require("./runsqlfile");

var pool = mysql.createPool({
    connectionLimit: 4,
    host: "mysql.stud.iie.ntnu.no",
    user: "heleneyj",
    password: "aX3SR1kc",
    database: "heleneyj",
    debug: false
});

let ArticleDao = new ArticleDao(pool);

beforeAll(done => {
    runsqlfile("dao/create_tables.sql", pool, () => {
        runsqlfile("dao/create_testdata.sql", pool, done);
    })
});

afterAll(() => {
    pool.end();
});

test("get all articles from db", done => {
    function callback(status, data) {
        console.log(
            "Test callback: status=" + status + ", data.length=" + data.length
        );
        expect(data.length).toBeGreaterThanOrEqual(4);
        done();
    }

    ArticleDao.getArticles(callback);
});

test("get all important articles from db", done => {
    function callback(status, data) {
        console.log(
            "Test callback: status=" + status + ", data.length=" + data.length
        );
        expect(data.length).toBe(3);
        done();
    }

    ArticleDao.getImportant(callback);
});

test("get full newsfeed from db", done => {
    function callback(status, data) {
        console.log(
            "Test callback: status=" + status + ", data.length=" + data.length
        );
        expect(data.length).toBeGreaterThanOrEqual(4);
        done();
    }

    ArticleDao.getNewsfeed(callback);
});

test("get all articles in category from db", done => {
    function callback(status, data) {
        console.log(
            "Test callback: status=" + status + ", data.length=" + data.length
        );
        expect(data.length).toBe(2);
        done();
    }

    ArticleDao.getCategory('D&D', callback);
});

test("get one article from db", done => {
    function callback(status, data){
        console.log(
            "Test callback status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data.length).toBe(1);
        expext(data[0].title).toBe("tittel 1");
        done();
    }

    ArticleDao.getArticle(1, callback);
});

test("delete article", done => {
    function callback(status, data) {
        console.log("Test callback: status=" + status + ", data.length=" + data.length
        );
    }
    var before = data.length;
    ArticleDao.deleteArticle(2, callback);
    var after = data.length;
    expect(after).toBeLessThan(before);

});

test("add article to db", done => {
    function callback(status, data) {
        console.log(
            "Test callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data.affectedRows).toBeGreaterThanOrEqual(1);
        done();
    }

    ArticleDao.createArticle(
        { title: "New title", picturePath: "New path", pictureAlt: "New alt", pictureCapt: "New capt", text: "New text", author: "My Name", category: "Movies", importance: 2},
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

    ArticleDao.updateRating(
        {likes: 2, dislikes: 1}
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

    ArticleDao.getArticle(0, callback);
});
