const express = require('express')
const history = require('connect-history-api-fallback')

const app = express()
const port = 8082

app.use(history())
app.use(express.static('./dist'))
app.get('/', function (req, res) {
  res.sendFile('./dist/index.html')
})
app.listen(port, function () {
  console.log('Listening at http://localhost:' + port + '\n')
})
