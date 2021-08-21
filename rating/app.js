const express = require("express");
const app = express();
const port = 8081;
const connect = require('./models');
connect();
const ratingRouter = require('./routers/rating')
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.get('/health', async(req, res) => {
    console.log('health check')
    res.send({message: 'ok'});
});

app.use('/apis/v1', [ratingRouter]);

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
  })