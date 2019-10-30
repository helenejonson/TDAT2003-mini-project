var express = require("express");
var mysql = require("mysql");
var app = express();
var pool = mysql.createPool({
    connectionLimit: 2,
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
                req.body.viktighet,
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

app.get("/viktig", (req, res) => {
    console.log("Fikk request fra klient");
    pool.getConnection((err, connection) => {
        console.log("Connected to database");
        if (err) {
            console.log("Feil ved kobling til databasen");
            res.json({ error: "feil ved ved oppkobling" });
        } else {
            connection.query(
                "Select * from annonse where importance = 1 limit 20",
                req.body.viktighet,
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

app.get("/annonse/:id", (req, res) => {
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

app.post("/test", (req, res) => {
    console.log("Fikk POST-request fra klienten");
console.log("Navn: " + req.body.navn);
res.status(200);
res.json({ message: "success" });
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

app.put("/annonse", (req, res) => {
    console.log("Fikk PUT-request fra klienten");

    pool.getConnection((err, connection) => {
        if (err) {
            console.log("Feil ved oppkobling");
            res.json({ error: "feil ved oppkobling" });
        } else {
            console.log("Fikk databasekobling");
            var val = [req.body.overskrift,req.body.id];
            connection.query(
                "UPDATE annonse SET overskrift = ? WHERE id = ?;",
                val,
                err => {
                    if (err) {
                        console.log(err);
                        8 / 8
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

var server = app.listen(8080);