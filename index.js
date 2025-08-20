const express = require("express");
const urlRoute = require("./routes/url");
const { ConnectToMongoDB} = require("./connect");
const URL = require("./models/url");
const app = express();
const port = 8001;
ConnectToMongoDB('mongodb://localhost:27017/short-url')
.then(() => {
    console.log("MongoDB Connected");
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use("/url", urlRoute);
app.get("/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    const entry  = await URL.findOneAndUpdate(
        {
            shortId
        }, {
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                },
            },
    });
    res.redirect(entry.redirectURL);
});

app.listen(port, () => {
    console.log("Server Started");
});