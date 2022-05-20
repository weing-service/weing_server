const express = require("express")
const app = express()
const passport = require("passport")
const session = require("express-session")
const bodyParser = require("body-parser")
const config = require("./config/key")
const User = require("./data/user")

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

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findOne({ where: { id } })
    .then((user) => done(null, user))
    .catch((err) => done(err))
})

const scheduleRouter = require("./router/schedule")
const voteRouter = require("./router/vote")
const projectRouter = require("./router/project")
const authRouter = require("./router/auth")

app.use(session({ secret: "secret", resave: true, saveUninitialized: false }))

app.use(passport.initialize())
app.use(passport.session())

app.use("/vote", voteRouter)
app.use("/schedule", scheduleRouter)
app.use("/project", projectRouter)
app.use("/auth", authRouter)
