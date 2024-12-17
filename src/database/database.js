import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';

let db;

// connect to db
const openDatabase = async () => {
    db = await SQLite.openDatabaseAsync('app.db');
    await createTable();
    // await resetDatabase();
}

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
    const checkSql = `SELECT COUNT(*) as count FROM favorites WHERE user_id = ? AND title = ?`;
    const insertSql = `
        INSERT INTO favorites (user_id, title, price, longDescription, duration, distance, weather, image)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    try {
        const result = await db.getAllAsync(checkSql, [1, item.title]);

        // Extract the count value
        const count = result[0]?.count || 0;

        if (count > 0) {
            console.log('Item already in favorites:', item.title);
            if (callback) callback(false, null); // Indicate duplicate to callback
            return;
        }

        const insertResult = await db.runAsync(insertSql, [
            1, // Hardcoded user ID for now
            item.title,
            item.price,
            item.longDescription,
            item.duration,
            item.distance,
            item.weather,
            item.image
        ]);
        console.log('Favorite saved:', insertResult.lastInsertRowId);
        if (callback) callback(true, insertResult.lastInsertRowId); // Success callback
    } catch (error) {
        console.error('Error saving favorite:', error);
        if (callback) callback(false, null); // Error callback
    }
};


const fetchFavorites = async (callback) => {
    const sql = 'SELECT * FROM favorites WHERE user_id = ?';
    try {
        const rows = await db.getAllAsync(sql, [1]);  // Hardcoded user ID for now
        console.log('Fetched all favorites');
        if (callback) callback(rows.map(favorite => ({
            id: favorite.id,
            title: favorite.title,
            duration: favorite.duration,
            image: { uri: favorite.image.replace('{uri=', '').replace('}', '') },
            shortDescription: favorite.longDescription,
            longDescription: favorite.longDescription,
            price: favorite.price || 0,
        }))); // Pass the rows to the callback
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

// test function
const resetDatabase = async (callback) => {

    const sql = 'DELETE FROM favorites';

    try {
        await db.runAsync(sql); // Execute the SQL command

        console.log('Database reset successfully.');

        // Invoke the callback if provided
        if (callback && typeof callback === 'function') {
            callback(null, 'Success');
        }
    } catch (error) {
        console.error('Error resetting the database:', error);

        // Invoke the callback with an error if provided
        if (callback && typeof callback === 'function') {
            callback(error);
        }
    }
}

openDatabase();

export { saveFavorite, fetchFavorites, deleteFavorite };