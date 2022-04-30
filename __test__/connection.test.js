const { connect } = require('../Sequelize/utils/database')

test('Database connection', async () => {
    expect(await connect()).toBe(
        'Connection has been established successfully.'
    )
}, 15000)
