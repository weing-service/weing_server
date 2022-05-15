const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const config = require("./config/key")

app.use(bodyParser.json())

const mongoose = require("mongoose")
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected.."))
  .catch((err) => console.log(err))

app.listen(8080, function () {
  console.log("listening on 8080")
})

const scheduleRouter = require("./router/schedule")
const voteRouter = require("./router/vote")
const projectRouter = require("./router/project")

app.use("/vote", voteRouter)
app.use("/schedule", scheduleRouter)
app.use("/project", projectRouter)
