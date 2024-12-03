import * as SQLite from 'expo-sqlite';

let db;

// Connect to database
const openDatabase = async () => {
    db = await SQLite.openDatabaseAsync('app.db');
    await createTable();
    console.log('Database connected!');
};

// Create tables
const createTable = async () => {
    try {
        // Users table
        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS users (
                userId INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT UNIQUE NOT NULL,
                passwordHash TEXT NOT NULL,
                firstName TEXT NOT NULL,
                lastName TEXT NOT NULL,
                isAuthenticated INTEGER NOT NULL DEFAULT 0
            );
        `);

        // Favorites table (as per existing structure)
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

        console.log('Tables created successfully!');
    } catch (error) {
        console.error('Error creating tables:', error);
    }
};

// Register user
const registerUser = async (user, callback) => {
    const sql = `
        INSERT INTO users (email, passwordHash, firstName, lastName)
        VALUES (?, ?, ?, ?);
    `;
    try {
        const result = await db.runAsync(sql, [
            user.email,
            user.passwordHash, // Make sure to hash the password securely
            user.firstName,
            user.lastName,
        ]);
        console.log('User registered:', result.lastInsertRowId);
        if (callback) callback(true, result.lastInsertRowId);
    } catch (error) {
        if (error.message.includes('UNIQUE constraint failed')) {
            console.error('Email already exists.');
            if (callback) callback(false, 'Email already exists.');
        } else {
            console.error('Error registering user:', error);
            if (callback) callback(false, 'Error registering user.');
        }
    }
};

// Login user
const loginUser = async (email, passwordHash, callback) => {
    const sql = `
        SELECT userId, firstName, lastName FROM users
        WHERE email = ? AND passwordHash = ?;
    `;
    try {
        const user = await db.getAsync(sql, [email, passwordHash]);
        if (user) {
            await db.runAsync(`
                UPDATE users SET isAuthenticated = 1 WHERE userId = ?;
            `, [user.userId]);
            console.log('User authenticated:', user);
            if (callback) callback(true, user); // Pass the user details in the callback
        } else {
            console.log('Invalid credentials');
            if (callback) callback(false, 'Invalid email or password.');
        }
    } catch (error) {
        console.error('Error authenticating user:', error);
        if (callback) callback(false, 'Error authenticating user.');
    }
};

// Logout user
const logoutUser = async (userId, callback) => {
    const sql = `
        UPDATE users SET isAuthenticated = 0 WHERE userId = ?;
    `;
    try {
        await db.runAsync(sql, [userId]);
        console.log('User logged out:', userId);
        if (callback) callback(true);
    } catch (error) {
        console.error('Error logging out user:', error);
        if (callback) callback(false);
    }
};

// Fetch authenticated user
const fetchAuthenticatedUser = async (callback) => {
    const sql = `
        SELECT * FROM users WHERE isAuthenticated = 1;
    `;
    try {
        const user = await db.getAsync(sql);
        console.log('Authenticated user:', user);
        if (callback) callback(user);
    } catch (error) {
        console.error('Error fetching authenticated user:', error);
        if (callback) callback(null);
    }
};

// Favorites (existing implementation for context)
const saveFavorite = async (item, callback) => {
    const sql = `
        INSERT INTO favorites (user_id, title, price, longDescription, duration, distance, weather, image)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    try {
        const result = await db.runAsync(sql, [
            1, // Replace with actual user ID once authentication is integrated
            item.title,
            item.price,
            item.longDescription,
            item.duration,
            item.distance,
            item.weather,
            item.image
        ]);
        console.log('Favorite saved:', result.lastInsertRowId);
        if (callback) callback(true, result.lastInsertRowId);
    } catch (error) {
        console.error('Error saving favorite:', error);
        if (callback) callback(false, null);
    }
};

const fetchFavorites = async (callback) => {
    const sql = 'SELECT * FROM favorites WHERE user_id = ?';
    try {
        const rows = await db.getAllAsync(sql, [1]); // Replace with actual user ID
        console.log('Fetched favorites:', rows);
        if (callback) callback(rows);
    } catch (error) {
        console.error('Error fetching favorites:', error);
    }
};

const deleteFavorite = async (id, callback) => {
    const sql = 'DELETE FROM favorites WHERE id = ?';
    try {
        const result = await db.runAsync(sql, [id]);
        console.log(`Favorite with ID ${id} deleted.`);
        if (callback) callback(true);
    } catch (error) {
        console.error('Error deleting favorite:', error);
        if (callback) callback(false);
    }
};

// Initialize database
openDatabase();

export {
    registerUser,
    loginUser,
    logoutUser,
    fetchAuthenticatedUser,
    saveFavorite,
    fetchFavorites,
    deleteFavorite
};
