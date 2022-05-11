var router = require('express').Router()
const scheduleCtrl = require('../controller/schedule')

// 일정 생성
router.post('/', scheduleCtrl.scheduleSave)

module.exports = router
