const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const { connect } = require('./Sequelize/utils/database')
// connect()

async function connectdb() {
    const res = await connect()
    console.log(res)
}
connectdb()

const corsOptions = {
    origin: 'http://localhost:8000',
}

app.use(cors(corsOptions))
//content-type - application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.json({ message: 'LEDGER app is live' })
})

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})
