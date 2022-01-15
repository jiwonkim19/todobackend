const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3005
const { use } = require('express/lib/application')
var cors = require('cors');
const pool = require("./TodoDB")
const { req, res, next } = require('express')

//middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

var jsonParser = bodyParser.json()

//ROUTES

//create a todo item

app.post("/items", async (req, res) => {
  const task = req.body.task;
  const status = req.body.status;
  const template = 'INSERT INTO todolisttable (task, status) VALUES ($1, $2)'
  const response = await pool.query(template, [task, status])
  res.json(req.body)

})

//get all todo items
app.get("/items", async (req, res) => {
  const template = 'SELECT * from todolisttable'
  const response = await pool.query(template)
  res.json(response.rows)
})

//update a todo item
app.put("/items", async (req, res) => {
  const task = req.body.input.task
  const status = req.body.input.status
  const template = 'UPDATE todolisttable SET status = $1 WHERE task = $2'
  const response = await pool.query(template, [status, task])
})

//delete a todo item

app.delete("/items", async (req, res) => {

  const values = req.body.input.task
  const template = 'DELETE FROM todolisttable WHERE task = $1';
  const response = await pool.query(template, [values])
}
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})



