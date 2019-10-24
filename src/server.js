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
                "Select overskrift, innhold, kategori from annonse",
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
                "Select overskrift, innhold, kategori from annonse where viktighet = 1 limit 20",
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
                "Select overskrift, innhold, kategori from annonse where id=?",
                req.body.id,
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
var val = [req.body.overskrift, req.body.innhold, req.body.bilde,req.body.kategori,req.body.viktighet];
connection.query(
    "insert into annonse ( overskrift, innhold, bilde, kategori, viktighet) values (?,?,?,?,?)",
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