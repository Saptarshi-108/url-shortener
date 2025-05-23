const express = require("express");
const app = express();
const urlRoute = require("./routes/url");
const port = 8000;
const URL = require("./models/url");
const { connectMongoDB } = require("./connect");

connectMongoDB("mongodb://localhost:27017/short-url").then(() => {
  console.log("MongoDB connected!");
});

app.use("/url", urlRoute);
app.use(express.json);

app.get("/:shortID", async (req, res) => {
  const shortID = req.params.shortID;
  const entry = await URL.findOneAndUpdate(
    {
      shortID,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
});

app.listen(port, () => console.log("Connection Established!"));
