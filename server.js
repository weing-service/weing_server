const express = require("express")
const app = express()
const voteRouter = require("./router/vote.js")

// admin, weing25
// mongodb+srv://admin:<password>@weing.jl8pj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
const mongoose = require("mongoose")
mongoose
  .connect(
    "mongodb+srv://admin:weing25@weing.jl8pj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB Connected.."))
  .catch((err) => console.log(err))

app.listen(8080, function () {
  console.log("listening on 8080")
})

app.get("/", function (req, res) {
  res.send("메인 페이지")
})

app.use(express.json())
app.use("/vote", voteRouter)
