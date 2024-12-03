import * as SQLite from 'expo-sqlite';

// connect to db
const db = SQLite.openDatabaseSync('app.db');

// create table
const createTable = async () => {
    try {
        await db.execAsync(`
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
        `);
    } catch (error) {
        console.error('Error creating table:', error);
    }
};

const saveFavorite = async (item, callback) => {
    const sql = `
        INSERT INTO favorites (user_id, title, price, longDescription, duration, distance, weather, image)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    try {
        const result = await db.runAsync(sql, [
            1, // Hardcoded user ID for now
            item.title,
            item.price,
            item.longDescription,
            item.duration,
            item.distance,
            item.weather,
            item.image
        ]);
        console.log('Favorite saved:', result.lastInsertRowId);
        if (callback) callback(true, result.lastInsertRowId); // Success callback
    } catch (error) {
        console.error('Error saving favorite:', error);
        if (callback) callback(false, null); // Error callback
    }
};


const fetchFavorites = async (callback) => {
    const sql = 'SELECT * FROM favorites WHERE user_id = ?';
    try {
        const rows = await db.getAllAsync(sql, [1]);  // Hardcoded user ID for now
        console.log('Fetched favorites:', rows);
        if (callback) callback(rows); // Pass the rows to the callback
    } catch (error) {
        console.error('Error fetching favorites:', error);
    }
};

const deleteFavorite = async (id, callback) => {
    const sql = 'DELETE FROM favorites WHERE id = ?';
    try {
        const result = await db.runAsync(sql, [id]);
        console.log(`Favorite with ID ${id} deleted.`);
        if (callback) callback(true); // Success callback
    } catch (error) {
        console.error('Error deleting favorite:', error);
        if (callback) callback(false); // Error callback
    }
};

export { saveFavorite, fetchFavorites, deleteFavorite };