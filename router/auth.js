const express = require('express')
const router = express.Router()
const passport = require('passport')
const KakaoStrategy = require('passport-kakao').Strategy

const User = require("../data/user")


passport.use('kakao', new KakaoStrategy({
    clientID: 'bac1c38075649192576b660431975eb4',
    callbackURL: 'auth/kakao',   
}, async (accessToken, refreshToken, profile, done) => {

    const exUser = await User.findOne({
        where: { id: profile.id, provider: 'kakao' },
    });
    
    if(!exUser){
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
    }
    
    done(null, exUser) 
}))

passport.serializeUser((exUser, done) => {
    // 로그인시, 사용자 아이디와 accessToken 세션에 저장
    done(null, {id : exUser.id, accessToken : exUser.accessToken});
});

passport.deserializeUser((user, done) => {
    // user = {id : data.user.id, accessToken : data.accessToken}
    User.findOne({ where: { id:user.id } })
    .then((result) => { // db에서 가져온 유저데이터 결과 result
        done(null, result); // req.user 에 저장된다.
    })
    .catch((error) => done(error));
});

router.get('/kakao', passport.authenticate('kakao'))

// 카카오 로그아웃
// auth//kakao/logout
router.get('/kakao/logout', async (req,res)=>{
    // req로 사용자 아이디 전달
    User.findOneAndDelete({'id': req.body.id}).then(() => {
        res.json({message: "삭제 성공!"})
    })
    .catch(err => res.status(500).send(err));
    
})
/*
router.get('/kakao/callback', passport.authenticate('kakao', {
    failureRedirect: '/',
}), (res, req) => {
    res.redirect('/auth')
});
*/

module.exports = router