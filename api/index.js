const express = require('express')
const cors = require('cors')
const pgp = require('pg-promise')(/* options */)

const app = express()
const port = 3000
const db = pgp(`postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DB}`)
app.use(cors())



app.get('/api/getusers/', (req, res) => {
  db.any('SELECT * FROM users ORDER BY id ASC')
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.log('ERROR:', error)
    })
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
