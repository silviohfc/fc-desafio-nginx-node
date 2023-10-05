const express = require('express')
const app = express()
const port = 3000
const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
}
const mysql = require('mysql')
const fakerator = require('fakerator/dist/locales/pt-BR')()

app.get('/', (req, res) => {
  const connection = mysql.createConnection(config)

  let sql = `INSERT INTO people(name) values ('${fakerator.names.name()}')`
  connection.query(sql)

  sql = `SELECT * FROM people`

  connection.query(sql, (error, results) => {
    const responseString = `
      <h1>Full Cycle Rocks!</h1>
      <ul>${results.map(result => "<li>"+ result.name +"</li>").join("")}</ul>
    `
    res.send(responseString)
  })
  
  connection.end()
})

app.listen(port, () => {
  console.log('Rodando na porta ' + port)
})