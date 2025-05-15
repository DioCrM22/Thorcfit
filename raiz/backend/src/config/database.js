const mysql = require('mysql2/promise');
require('dotenv').config();


module.exports = {
  database: process.env.DB_NAME || 'thorcfit',
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  dialect: 'mysql',
  dialectModule: require('mysql2'),
  define: {
    timestamps: false,
    underscored: true
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};