const ArticleDao = require('./ArticleDao');
const CommentDao = require('./CommentDao');
const CategoryDao = require('./CategoryDao');
var express = require("express");
var mysql = require("mysql");
var app = express();
var pool = mysql.createPool({
    connectionLimit: 4,
    host: "mysql.stud.iie.ntnu.no",
    user: "heleneyj",
    password: "aX3SR1kc",
    database: "heleneyj",
    debug: false
});
var articleDao = new ArticleDao(pool);
var commentDao = new CommentDao(pool);
var categoryDao = new CategoryDao(pool);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

var bodyParser = require("body-parser");
app.use(bodyParser.json()); // for å tolke JSON

app.get("/annonse", (req, res) => {
    console.log("/annonse: fikk request fra klient");
    articleDao.getArticles((status, data) => {
        res.status(status);
        res.json(data);
    });
});

app.get("/annonse/viktig", (req, res) => {
    console.log("/annonse: fikk request fra klient");
    articleDao.getImportant((status, data) => {
        res.status(status);
        res.json(data);
    });
});

app.get("/annonse/newsfeed", (req, res) => {
    console.log("/annonse: fikk request fra klient");
    articleDao.getNewsfeed((status, data) => {
        res.status(status);
        res.json(data);
    });
});

app.get("/annonse/:id(\\d+)", (req, res) => {
    console.log("/annonse/:id(\\d+): fikk request fra klient");
    articleDao.getArticle(req.params.id, (status, data) => {
        res.status(status);
        res.json(data);
    });
});

app.get("/annonse/category/:category", (req, res) => {
    console.log("/annonse/category/:category: fikk request fra klient");
    articleDao.getCategory(req.params.category, (status, data) => {
        res.status(status);
        res.json(data);
    });
});

app.post("/annonse", (req, res) => {
    console.log("/annonse: fikk request fra klient");
    articleDao.createArticle(req.body, (status, data) => {
        res.status(status);
        res.json(data);
    });
});

app.delete("/annonse/:id", (req, res) => {
    console.log("/annonse: fikk request fra klient");
    articleDao.deleteArticle(req.params.id, (status, data) => {
        res.status(status);
        res.json(data);
    });
});

app.post("/annonse/:articleId/comment", (req, res) => {
    console.log("/annonse/:articleId/comment: fikk request fra klient");
    commentDao.createComment(req.body, (status, data) => {
        res.status(status);
        res.json(data);
    });
});

app.get("/annonse/:articleId/comment", (req, res) => {
    console.log("/annonse/:articleId/comment: fikk request fra klient");
    commentDao.getComments(req.params.articleId, (status, data) => {
        res.status(status);
        res.json(data);
    });
});

app.put("/annonse/rating", (req, res) => {
    console.log("/annonse/rating: fikk request fra klient");
    articleDao.updateRating(req.body, (status, data) => {
        console.log(data);
        res.status(status);
        res.json(data);
    });
});

app.get("/annonse/categoryList", (req, res) => {
    console.log("/annonse/categoryList: fikk request fra klient");
    categoryDao.getCategories( (status, data) => {
        res.status(status);
        res.json(data);
    });
});

var server = app.listen(8080);