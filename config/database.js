const dotenv = require('dotenv').config();
const Sequelize = require('sequelize');

const sequelize = new Sequelize('bankapi', 'root', '', {
    host : 'localhost',
    dialect : 'mysql',
    port:'3307',
    pool:{
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;