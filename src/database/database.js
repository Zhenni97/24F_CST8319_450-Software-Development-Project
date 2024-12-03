const sqlite3 = require('sqlite3').verbose();

let sql;

// connect to db
const db = new sqlite3.Database('./app.db', sqlite3.OPEN_READWRITE, (err)=> {
    if (err) return console.error(err.message);
});
// create table
sql = `
CREATE TABLE IF NOT EXISTS favorites (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    price REAL,
    longDescription TEXT,
    duration TEXT,
    distance TEXT,
    weather TEXT,
    image TEXT
);
`;

db.run(sql);

