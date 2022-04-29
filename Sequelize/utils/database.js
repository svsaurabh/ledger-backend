/**
 @author Shriyansh Vishwakarma <svshriyansh@outlook.com>
*/

require('dotenv').config()
const { database, password, username, host } = process.env
const { Sequelize } = require('sequelize')

const sequelize = new Sequelize({
    database: database,
    username: username,
    password: password,
    host: host,
    port: 5432,
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
})
async function connect() {
    try {
        await sequelize.authenticate()
        return 'Connection has been established successfully.'
    } catch (error) {
        console.error('Unable to connect to the database:', error)
    }
}

module.exports = { sequelize, connect }
