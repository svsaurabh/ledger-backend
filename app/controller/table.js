const db = require('../models/queries')
const Table = db.Table
const Op = db.Sequelize.Op

exports.create = (req, res) => {
    if (!req.body.title) {
        res.status(400).send({
            message: 'Content can not be empty',
        })
        return
    }
    const table = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        id: req.body.id,
    }
    Table.create(table)
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || 'Some error occured while writing the Table',
            })
        })
}
