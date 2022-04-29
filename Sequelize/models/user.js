module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'User',
        {
            firtstName: {
                type: DataTypes.String,
                validator: {
                    len: [3, 10],
                },
                allowNull: false,
            },
            lastName: {
                type: DataTypes.String(10),
                validator: {
                    len: [2, 10],
                },
                allowNull: true,
            },
            email: {
                type: DataTypes.String(30),
                validator: {
                    isEmail: true,
                },
            },
            password: {
                type: DataTypes.String(8),
                allowNull: false,
            },
        },
        {
            timestamp: true,
            userValidation() {
                if (this.firtstName.len < 2) {
                    throw new Error('firstName length must be 3 or greater!')
                }
            },
        },
        {
            tableName: 'User',
        }
    )
}
