const express = require("express");
const middleware = require("./middlewares/middlewareForTransaction");
const app = express();
const port = 8081;
const connect = require("./models");
connect();
const ratingRouter = require("./routers/rating");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/health", async (req, res) => {
    console.log("health check");
    res.send({ message: "ok" });
});

app.use("/apis/v1", middleware, [ratingRouter]);

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
});
