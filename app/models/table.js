module.exports = (sequelize, Sequelize) => {
    const Table = sequelize.define('table', {
        firstname: {
            type: Sequelize.STRING,
        },
        lastname: {
            type: Sequelize.STRING,
        },
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
        },
    })
    return Table
}
