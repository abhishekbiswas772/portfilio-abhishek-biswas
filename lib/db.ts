import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import path from 'path';

let db: Database<sqlite3.Database, sqlite3.Statement> | null = null;

// Function to open the database connection
export async function openDb() {
  if (!db) {
    // Specify the database file path with absolute path to project root
    const dbPath = path.join(process.cwd(), 'messages.db'); 
    console.log(`[DB] Opening database connection to: ${dbPath}`);
    
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database
    });
    
    console.log('[DB] Database connection opened successfully.');
    
    // Create the messages table if it doesn't exist
    await db.exec(`
      CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        message TEXT NOT NULL,
        receivedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('[DB] \'messages\' table verified/created.');
  }
  return db;
}

// Optional: Function to close the database (useful for graceful shutdown, but maybe not needed in serverless environments)
export async function closeDb() {
  if (db) {
    console.log('[DB] Closing database connection...');
    await db.close();
    db = null;
    console.log('[DB] Database connection closed.');
  }
} 