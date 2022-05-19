const express = require('express')
const router = express.Router()
const passport = require('passport')
const loginCtrl = require("../controller/middlewares")
const KakaoStrategy = require('passport-kakao').Strategy
const User = require('../data/user')

const config = require("../config/key")


passport.use('kakao', new KakaoStrategy({
    clientID: config.clientID,
    callbackURL: '/auth/kakao/callback',
}, async (accessToken, refreshToken, profile, done) => { // oAuth2
    try {
        const exUser = await User.findOne({ where: { id: profile.id, provider: 'kakao' } }) // 카카오로 이미 가입되어있는 인원이 있나 확인한다.
        if (!exUser) {
            const exUser = await User.create({
                id: profile.id,
                username: profile.username,
                displayName: profile.displayName,
                provider: profile.provider,
                profile_image: profile._json.properties.profile_image,
                thumbnail_image: profile._json.properties.thumbnail_image,
            })
        }
        const tokenUser = {
            user: exUser,
            accessToken : accessToken || ' '
        }
        done(null, tokenUser)
    } catch (error) {
    console.error(error)
    done(error)
    }
}));



router.get('/logout', loginCtrl.isLoggedIn, async(req, res) => {
    req.logout()
    req.session.destroy()
    res.redirect('/')
    
});

router.get('/kakao', passport.authenticate('kakao'))

router.get('/kakao/callback', passport.authenticate('kakao', {
    failureRedirect: '/',
    }), (req, res) => {
    res.redirect('/')
});

module.exports = router