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

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var bodyParser = require("body-parser");
app.use(bodyParser.json()); // for å tolke JSON


app.get("/annonse", (req, res) => {
    console.log("Fikk request fra klient");
    pool.getConnection((err, connection) => {
        console.log("Connected to database");
        if (err) {
            console.log("Feil ved kobling til databasen");
            res.json({ error: "feil ved ved oppkobling" });
        } else {
            connection.query(
                "Select * from annonse",
                (err, rows) => {
                    connection.release();
                    if (err) {
                        console.log(err);
                        res.json({ error: "error querying" });
                    } else {
                        console.log(rows);
                        res.json(rows);
                    }
                }
            );
        }
    });
});

app.get("/annonse/newsfeed", (req, res) => {
    console.log("Fikk request fra klient");
    pool.getConnection((err, connection) => {
        console.log("Connected to database");
        if (err) {
            console.log("Feil ved kobling til databasen");
            res.json({ error: "feil ved ved oppkobling" });
        } else {
            connection.query(
                "Select * from annonse order by date desc limit 5",
                (err, rows) => {
                    connection.release();
                    if (err) {
                        console.log(err);
                        res.json({ error: "error querying" });
                    } else {
                        console.log(rows);
                        res.json(rows);
                    }
                }
            );
        }
    });
});

app.get("/annonse/viktig", (req, res) => {
    console.log("Fikk request fra klient");
    pool.getConnection((err, connection) => {
        console.log("Connected to database");
        if (err) {
            console.log("Feil ved kobling til databasen");
            res.json({ error: "feil ved ved oppkobling" });
        } else {
            connection.query(
                "Select * from annonse where importance = 1 order by date desc limit 20",
                req.params.importance,
                (err, rows) => {
                    connection.release();
                    if (err) {
                        console.log(err);
                        res.json({ error: "error querying" });
                    } else {
                        console.log(rows);
                        res.json(rows);
                    }
                }
            );
        }
    });
});

app.get("/annonse/:id(\\d+)", (req, res) => {
        console.log("Fikk request fra klient");
    pool.getConnection((err, connection) => {
            console.log("Connected to database");
        if (err) {
            console.log("Feil ved kobling til databasen");
            res.json({ error: "feil ved ved oppkobling" });
        } else {
            connection.query(
                "Select * from annonse where id=?",
                req.params.id,
                (err, rows) => {
                connection.release();
            if (err) {
                console.log(err);
                res.json({ error: "error querying" });
            } else {
                console.log(rows);
                res.json(rows);
            }
        }
        );
        }
    });
});

app.get("/annonse/category/:category", (req, res) => {
    console.log("Fikk request fra klient");
    pool.getConnection((err, connection) => {
        console.log("Connected to database");
        if (err) {
            console.log("Feil ved kobling til databasen");
            res.json({ error: "feil ved ved oppkobling" });
        } else {
            connection.query(
                "Select * from annonse where category = ?",
                req.params.category,
                (err, rows) => {
                    connection.release();
                    if (err) {
                        console.log(err);
                        res.json({ error: "error querying" });
                    } else {
                        console.log(rows);
                        res.json(rows);
                    }
                }
            );
        }
    });
});

app.get("/annonse/:id(\\d+)/rating", (req, res) => {
    console.log("Fikk request fra klient");
    pool.getConnection((err, connection) => {
        console.log("Connected to database");
        if (err) {
            console.log("Feil ved kobling til databasen");
            res.json({ error: "feil ved ved oppkobling" });
        } else {
            connection.query(
                "Select * from rating where articleId = ?",
                req.params.id,
                (err, rows) => {
                    connection.release();
                    if (err) {
                        console.log(err);
                        res.json({ error: "error querying" });
                    } else {
                        console.log(rows);
                        res.json(rows);
                    }
                }
            );
        }
    });
});

app.post("/annonse", (req, res) => {
    console.log("Fikk POST-request fra klienten");

    pool.getConnection((err, connection) => {
        if (err) {
            console.log("Feil ved oppkobling");
            res.json({ error: "feil ved oppkobling" });
        } else {
            console.log("Fikk databasekobling");
            var val = [req.body.title, req.body.picturePath, req.body.pictureAlt,req.body.pictureAlt,req.body.text,req.body.author,req.body.category,req.body.importance];
            connection.query(
                "insert into annonse ( title, picturePath, pictureAlt, pictureCapt, text, author, category, importance) values (?,?,?,?,?,?,?,?)",
                val,
                err => {
                    connection.release();
                    if (err) {
                        console.log(err);
                        8 / 8
                        res.status(500);
                        res.json({ error: "Feil ved insert" });
                    } else {
                        console.log("insert ok");
                        res.send("");
                    }
                }
            );
        }
    });
});

app.post("/annonse/rating", (req, res) => {
    console.log("Fikk POST-request fra klienten");

    pool.getConnection((err, connection) => {
        if (err) {
            console.log("Feil ved oppkobling");
            res.json({ error: "feil ved oppkobling" });
        } else {
            console.log("Fikk databasekobling");
            var val = [req.params.articleId, req.params.likes, req.params.dislikes];
            connection.query(
                "insert into rating (articleId, likes, dislikes) values (?,?,?)",
                val,
                err => {
                    connection.release();
                    if (err) {
                        console.log(err);
                        res.status(500);
                        res.json({ error: "Feil ved insert" });
                    } else {
                        console.log("insert ok");
                        res.send("");
                    }
                }
            );
        }
    });
});

app.put("/annonse/rating", (req, res) => {
    console.log("Fikk PUT-request fra klienten");

    pool.getConnection((err, connection) => {
        if (err) {
            console.log("Feil ved oppkobling");
            res.json({ error: "feil ved oppkobling" });
        } else {
            console.log("Fikk databasekobling");
            var val = [req.params.likes,req.params.dislikes, req.params.articleId];
            connection.query(
                "UPDATE rating SET likes = ?, dislikes = ? WHERE articleId = ?;",
                val,
                err => {
                    connection.release();
                    if (err) {
                        console.log(err);
                        res.status(500);
                        res.json({ error: "Feil ved insert" });
                    } else {
                        console.log("Update ok");
                        res.send("");
                    }
                }
            );
        }
    });
});

app.post("/annonse/:articleId/comment", (req, res) => {
    console.log("Fikk POST-request fra klienten");

    pool.getConnection((err, connection) => {
        if (err) {
            console.log("Feil ved oppkobling");
            res.json({ error: "feil ved oppkobling" });
        } else {
            console.log("Fikk databasekobling");
            var val = [req.params.articleId, req.body.username, req.body.text];
            connection.query(
                "insert into comments (articleId, username, text) values (?,?,?)",
                val,
                err => {
                    connection.release();
                    if (err) {
                        console.log(err);
                        res.status(500);
                        res.json({ error: "Feil ved insert" });
                    } else {
                        console.log("insert ok");
                        res.send("");
                    }
                }
            );
        }
    });
});

app.get("/annonse/:articleId/comment", (req, res) => {
    console.log("Fikk request fra klient");
    pool.getConnection((err, connection) => {
        console.log("Connected to database");
        if (err) {
            console.log("Feil ved kobling til databasen");
            res.json({ error: "feil ved ved oppkobling" });
        } else {
            connection.query(
                "Select * from comments where articleId = ? order by date DESC",
                req.params.articleId,
                (err, rows) => {
                    connection.release();
                    if (err) {
                        console.log(err);
                        res.json({error: "error querying"});
                    } else {
                        console.log(rows);
                        res.json(rows);
                    }
                }
            );
        }
    });
});

app.delete("/annonse/:id", (req, res) => {
    console.log("Fikk DELETE-request fra klienten");

    pool.getConnection((err, connection) => {
        if (err) {
            console.log("Feil ved oppkobling");
            res.json({ error: "feil ved oppkobling" });
        } else {
            console.log("Fikk databasekobling");
            var val = [req.params.id];
            connection.query(
                "delete from annonse where id = ?;",
                val,
                err => {
                    connection.release();
                    if (err) {
                        console.log(err);
                        res.status(500);
                        res.json({ error: "Feil ved insert" });
                    } else {
                        console.log("Delete ok");
                        res.send("");
                    }
                }
            );
        }
    });
});

var server = app.listen(8080);