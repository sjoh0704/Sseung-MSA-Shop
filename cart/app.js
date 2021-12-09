const express = require("express");
const app = express();
const port = 8080;
const connect = require("./schemas");
connect();
const cartRouter = require("./routers/cart");
const middleware = require("./middlewares/middlewareForTransaction");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

app.get("/health", async (req, res) => {
    console.log("health check");
    res.send({ message: "ok" });
});

app.use("/apis/v1", middleware, [cartRouter]);

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
});
