const express = require('express')
const router = express.Router()
const passport = require('passport')
const KakaoStrategy = require('passport-kakao').Strategy

const User = require("../data/user")

passport.use('kakao', new KakaoStrategy({
    clientID: 'bac1c38075649192576b660431975eb4',
    callbackURL: 'auth/kakao',   
}, async (accessToken, refreshToken, profile, done) => {
    console.log(accessToken)
    console.log(refreshToken)
    console.log(profile)
    console.log(done)
    new User({
        id: profile.id,
        username: profile.username,
        displayName: profile.displayName,
        provider: profile.provider,
        profile_image: profile._json.properties.profile_image,
        thumbnail_image: profile._json.properties.thumbnail_image,
        accessToken,
        refreshToken
    }).save((err, result) => {
        if (err) return console.log(err)
        console.log(result)
    })

    
}))


router.get('/kakao', passport.authenticate('kakao'))

/*
router.get('/kakao/callback', passport.authenticate('kakao', {
    failureRedirect: '/',
}), (res, req) => {
    res.redirect('/auth')
});
*/

module.exports = router