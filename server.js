const express = require("express")
const app = express()
const passport = require('passport')
const session = require('express-session')
const bodyParser = require("body-parser")
const config = require("./config/key")
const User = require('./data/user')

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

passport.serializeUser((data, done) => {
  done(null, {id : data.user.id, accessToken : data.accessToken})
})

passport.deserializeUser((user, done) => {
  User.findOne({ where: { id: user.id } })
  .then((result) => { // db에서 가져온 유저데이터 결과 result
    const tokenUser = { user: result, accessToken : user.accessToken}; 
    done(null, tokenUser); // req.user 에 저장된다.
  }) // 조회한 정보를 req.user에 저장한다.
  .catch((error) => done(error));
});

const scheduleRouter = require("./router/schedule")
const voteRouter = require("./router/vote")
const projectRouter = require("./router/project")
const authRouter = require("./router/auth")

app.use(session({ secret: 'secret', resave: true, saveUninitialized: false }))

app.use(passport.initialize())
app.use(passport.session())


app.use("/vote", voteRouter)
app.use("/schedule", scheduleRouter)
app.use("/project", projectRouter)
app.use('/auth', authRouter)
