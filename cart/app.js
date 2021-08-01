const express = require("express");
const app = express();
const port = 8080;
const connect = require('./schemas');
const cartRouter = require('./routers/carts')
const goodsRouter = require("./routers/goods");
connect();
app.use(express.static('public'));

app.get('/health', async(req, res) => {
    res.send({message: 'ok'});
});




app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
  })