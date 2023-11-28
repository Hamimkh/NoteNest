const connectToMongo = require('./db');
var cors = require('cors')
connectToMongo();

const express = require('express')
const app = express()
const port = 5000
 
app.use(cors())
app.use(express.json())

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
}) 