const express = require("express")
const router = express.Router()
const passport = require("passport")
const loginCtrl = require("../controller/middlewares")
const KakaoStrategy = require("passport-kakao").Strategy
const User = require("../data/user")

const config = require("../config/key")

passport.use(
  "kakao",
  new KakaoStrategy(
    {
      clientID: config.clientID,
      callbackURL: "/auth/kakao/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      // oAuth2
      try {
        const exUser = await User.findOne({
          id: profile.id,
          provider: "kakao",
        }) // 카카오로 이미 가입되어있는 인원이 있나 확인한다.
        if (exUser) {
          done(null, exUser)
        } else {
          const newUser = await User.create({
            id: profile.id,
            username: profile.username,
            displayName: profile.displayName,
            provider: profile.provider,
            profile_image: profile._json.properties.profile_image,
            thumbnail_image: profile._json.properties.thumbnail_image,
          })
          done(null, newUser)
        }
      } catch (error) {
        console.error(error)
        done(error)
      }
    }
  )
)

router.get("/logout", loginCtrl.isLoggedIn, (req, res) => {
  console.log(req.session.passport.user)
  req.logout()
  req.session.destroy()
  res.redirect("/")
})

router.get("/kakao", passport.authenticate("kakao"))

router.get(
  "/kakao/callback",
  passport.authenticate("kakao", {
    failureRedirect: "/",
  }),
  (req, res) => {
    res.redirect("/")
    console.log('로그인 성공')
    console.log(req.session.passport.user)
    passport.session.id = req.session.passport.user
    console.log(passport.session.id)
  }
)

module.exports = router
