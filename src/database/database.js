import * as SQLite from 'expo-sqlite';

let db;

// Connect to database
const openDatabase = async () => {
    db = await SQLite.openDatabaseAsync('app.db');
    //await resetTable(); // Call this during testing
    console.log('Database connected!');
};

/*// Drop and recreate the `users` table (for development purposes)
const resetTable = async () => {
    try {
        await db.execAsync(`DROP TABLE IF EXISTS users;`); // Drop the table
        await createTable(); // Recreate the table
        console.log('Users table reset successfully!');
    } catch (error) {
        console.error('Error resetting table:', error);
    }
};
*/

// Create the `users` table
const createTable = async () => {
    try {
        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS users (
                userId INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT UNIQUE NOT NULL,
                passwordHash TEXT NOT NULL,
                isAuthenticated INTEGER NOT NULL DEFAULT 0
            );
        `);
        console.log('Users table created successfully!');
    } catch (error) {
        console.error('Error creating tables:', error);
    }
};

// Register a new user
const registerUser = async (user, callback) => {
    const sql = `
        INSERT INTO users (email, passwordHash)
        VALUES (?, ?);
    `;
    try {
        const result = await db.runAsync(sql, [
            user.email,
            user.passwordHash,
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

// Login a user
const loginUser = async (email, passwordHash, callback) => {
    const sql = `
        SELECT userId FROM users
        WHERE email = ? AND passwordHash = ?;
    `;
    try {
        const user = await db.getAsync(sql, [email, passwordHash]);
        if (user) {
            console.log('User authenticated:', user);
            if (callback) callback(true, user); // Pass user details
        } else {
            console.log('Invalid credentials');
            if (callback) callback(false, 'Invalid email or password.');
        }
    } catch (error) {
        console.error('Error logging in user:', error);
        if (callback) callback(false, 'Error logging in user.');
    }
};

// Logout a user
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

// Initialize the database
openDatabase();

export {
    registerUser,
    loginUser,
    logoutUser,
    fetchAuthenticatedUser,
};
