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
    user_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    price REAL,
    longDescription TEXT,
    duration TEXT,
    distance TEXT,
    weather TEXT,
    image TEXT
);
`;

db.run(sql, (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log("Favorites table created successfully.");
    }
});

const saveFavorite = (item) => {
    sql = `
    INSERT INTO favorites (user_id, title, price, longDescription, duration, distance, weather, image)
    VALUES (1, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.run(sql,
     [item.title, item.price, item.longDescription, item.duration, item.distance, item.weather, item.image],
     function (err) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log("Favorite saved with this ID: ${this.lastID}");
        }
    });
};

const fetchFavorites = () => {
    const sql = "SELECT * FROM favorites WHERE user_id = 1"; // user doesn't have ids yet

    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log("Fetched favorites:", rows);
        }
    });
};

const deleteFavorite = (id) => {
    const sql = "DELETE FROM favorites WHERE id = ?";

    db.run(sql, [id], function (err) {
        if (err) {
            console.error(err.message);
        } else {
            console.log("Favorite with ID ${id} deleted.");
        }
    });
};