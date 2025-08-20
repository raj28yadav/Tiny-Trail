const express = require("express");
const urlRoute = require("./routes/url");
const { ConnectToMongoDB} = require("./connect");
const app = express();
const port = 8001;
ConnectToMongoDB('mongodb://localhost:27017/short-url')
.then(() => {
    console.log("MongoDB Connected");
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use("/url", urlRoute);

app.listen(port, () => {
    console.log("Server Started");
});