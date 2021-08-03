const express = require("express");
const app = express();
const port = 8500;
const connect = require('./schemas');
const cartRouter = require('./routers/cart')
connect();
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(express.static('public'));

app.get('/health', async(req, res) => {
    res.send({message: 'ok'});
});

app.use('/apis/v1', [cartRouter]);




app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
  })