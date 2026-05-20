const Database = require('better-sqlite3');
const db = new Database('./marghadarshak.db');

db.prepare(
  `CREATE TABLE IF NOT EXISTS users (
     id INTEGER PRIMARY KEY AUTOINCREMENT,
     username TEXT UNIQUE,
     password TEXT,
     age_group TEXT,
     interests TEXT
  )`
).run();

db.prepare(
  `CREATE TABLE IF NOT EXISTS competitions (
     id INTEGER PRIMARY KEY AUTOINCREMENT,
     title TEXT,
     description TEXT
  )`
).run();

db.prepare(
  `CREATE TABLE IF NOT EXISTS internships (
     id INTEGER PRIMARY KEY AUTOINCREMENT,
     company TEXT,
     role TEXT,
     description TEXT
  )`
).run();

module.exports = db;
