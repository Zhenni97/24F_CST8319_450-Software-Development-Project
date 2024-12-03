import * as SQLite from 'expo-sqlite';

let sql;

// connect to db
const db = SQLite.openDatabase('app.db');

// create table
const createTable = () => {
    db.transaction(tx => {
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS favorites (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                title TEXT NOT NULL,
                price REAL,
                longDescription TEXT,
                duration TEXT,
                distance TEXT,
                weather TEXT,
                image TEXT
            );`
        );
    });
};

const saveFavorite = (item, callback) => {
    const sql = `
        INSERT INTO favorites (user_id, title, price, longDescription, duration, distance, weather, image)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.transaction(tx => {
        tx.executeSql(
            sql,
            [1, item.title, item.price, item.longDescription, item.duration, item.distance, item.weather, item.image],
            (_, result) => {
                console.log('Favorite saved:', result.insertId);
                if (callback) callback(true, result.insertId); // Success callback with the inserted ID
            },
            (_, error) => {
                console.error('Error saving favorite:', error);
                if (callback) callback(false, null); // Error callback
                return false;
            }
        );
    });
};

const fetchFavorites = (callback) => {
    const sql = "SELECT * FROM favorites WHERE user_id = ?";

    db.transaction(tx => {
        tx.executeSql(
            sql,
            [1],  // Hardcoded user ID for now
            (_, { rows }) => {
                console.log("Fetched favorites:", rows._array);
                if (callback) callback(rows._array);
            },
            (_, error) => {
                console.error("Error fetching favorites:", error);
                return false;
            }
        );
    });
};

const deleteFavorite = (id, callback) => {
    const sql = "DELETE FROM favorites WHERE id = ?";

    db.transaction(tx => {
        tx.executeSql(
            sql,
            [id],
            (_, result) => {
                console.log(`Favorite with ID ${id} deleted.`);
                if (callback) callback(true);
            },
            (_, error) => {
                console.error("Error deleting favorite:", error);
                if (callback) callback(false);
                return false;
            }
        );
    });
};

export { saveFavorite, fetchFavorites, deleteFavorite };