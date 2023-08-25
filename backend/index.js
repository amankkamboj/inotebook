const connectToMongo = require('./db');
const express = require('express')
const cors = require('cors');
const app = express()
const port = 8080

app.use(cors())

connectToMongo();
app.use(express.json())
// Avialable routes
app.use('/api/auth',require("./routes/auth"));
app.use('/api/notes',require("./routes/notes"));
app.listen(port, () => {
  console.log(`InoteBook backend listening on port ${port}`)
})