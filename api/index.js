const express = require('express')
const cors = require('cors')
const pgp = require('pg-promise')(/* options */)
const bodyParser = require('body-parser')


const app = express()
const port = 3000
const db = pgp(`postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DB}`)

app.use(cors())
app.use(bodyParser.json())



app.get('/api/get/problem_type/:id', (req, res) => {
  db.any(`SELECT id, name FROM problem_types WHERE id = ${req.params.id}`)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.log('ERROR:', error)
    })
});

app.get('/api/get/workers', (req, res) => {
  db.any(`SELECT id, name FROM workers`)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.log('ERROR:', error)
    })
});

app.get('/api/get/problems/:id', (req, res) => {
  db.any(`SELECT id, name, solutions FROM problems WHERE problemtypeid = ${req.params.id}`)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.log('ERROR:', error)
    })
});

app.get('/api/get/problem/:id', (req, res) => {
  db.any(`SELECT id, name, solutions FROM problems WHERE id = ${req.params.id}`)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.log('ERROR:', error)
    })
});

app.post('/api/set/request/', (req, res) => {
  const cs = new pgp.helpers.ColumnSet([
    'building',
    'room',
    'problemtypeid',
    'workerid',
    'workerphone',
    'description',
  ], {table: 'requests'});

  const data = { 
    building: req.body.building,
    room: req.body.room,
    problemtypeid: req.body.problemtypeid,
    workerid: req.body.workerid,
    workerphone: req.body.workerphone,
    description: req.body.description,
  }

  const insert = pgp.helpers.insert(data, cs);

  db.none(insert)
    .then(() => {
      res.json({
        data: data,
        query: insert,
        message: "Data in DB!"
      })
    })
    .catch(error => {
      res.json({error})
    });
  

});

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
