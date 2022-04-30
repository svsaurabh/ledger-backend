const database = require('../config/db')
const Sequelize = require('sequelize')
const sequelize = new Sequelize(database.DB, database.USER, database.PASSWORD, {
    host: database.HOST,
    dialect: database.dialect,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
    operatorsAliases: 0,
    pool: {
        max: database.pool.max,
        min: database.pool.min,
        acquire: database.pool.acquire,
        idle: database.pool.idle,
    },
})

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize
db.table = require('./table')(sequelize, Sequelize)
module.exports = db
