import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "monali@123",
  database: "bookshopdb",
});
//if there is a athu err, use bellow query in db
//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_current_password';

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("hello this is backend! home from backend server.");
});

app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/books", (req, res) => {
  const q = "INSERT INTO books (`title`,`desc`,`price`,`cover`) VALUES (?)";
  /*const values = [
        "title from Back",
        "desc from back",
        "cover pic from back"
    ]*/
  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("book has been added successfully");
  });
});

app.delete("/books:id", (req, res) => {
  const bookId = req.params.id;
  const q = "DELETE FROM books WHERE id = ?";

  db.query(q, [bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json("book has been deleted successfully");
  });
});

app.put("/books:id", (req, res) => {
  const bookId = req.params.id;
  const q =
    "UPDATE books SET `title` = ?,`desc` = ?,`price` = ?,`cover` = ? WHERE id = ?";
  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [...values, bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json("book has been updated successfully");
  });
});

app.listen(8800, () => {
  console.log("connected to the backend!");
});
