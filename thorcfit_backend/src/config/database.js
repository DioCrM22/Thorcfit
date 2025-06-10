const { Sequelize } = require('sequelize');
require('dotenv').config();

// Configuração do banco de dados
let sequelize;

if (process.env.NODE_ENV === 'production') {
  // Configuração para produção (MySQL)
  sequelize = new Sequelize(
    process.env.DB_NAME || 'thorcfit',
    process.env.DB_USER || 'root',
    process.env.DB_PASSWORD || '',
    {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 3306,
      dialect: 'mysql',
      logging: false,
      pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
      },
      define: {
        timestamps: true,
        underscored: false,
        freezeTableName: true
      },
      timezone: '-03:00' // Timezone do Brasil
    }
  );
} else {
  // Configuração para desenvolvimento (SQLite)
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
    logging: console.log,
    define: {
      timestamps: true,
      underscored: false,
      freezeTableName: true
    }
  });
}

module.exports = { sequelize };

