require('dotenv').config()
const { database, password, username, host } = process.env

module.exports = {
    HOST: host,
    USER: username,
    PASSWORD: password,
    DB: database,
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
}
