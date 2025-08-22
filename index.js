const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticrouter");
const userRoute = require("./routes/user");
const { ConnectToMongoDB} = require("./connect");
const URL = require("./models/url");
const { restrictToLoggedinUserOnly, checkAuth } = require("./middlewares/auth");
const app = express();
const port = 8001;
ConnectToMongoDB('mongodb://localhost:27017/short-url')
.then(() => {
    console.log("MongoDB Connected");
});


app.set("view engine", "ejs");
app.set('views', path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use("/url",restrictToLoggedinUserOnly, urlRoute);
app.use("/user", userRoute);
app.use("/", checkAuth, staticRoute);
app.get("/url/:shortId", async (req, res) => {
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