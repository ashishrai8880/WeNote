const express = require('express')
const app = express()
const port = 5000
const connectToMongo = require("./db");

connectToMongo() ;

//for getting user data in json format
app.use(express.json());

app.use('/api/auth' , require('./routes/auth'));
app.use('/api/notes' , require('./routes/notes'));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`App listening on port ${port} `)
})