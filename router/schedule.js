var router = require("express").Router()
const scheduleCtrl = require("../controller/schedule")

// 일정 생성
router.post("/", scheduleCtrl.scheduleSave)
// 일정 삭제
router.delete("/", scheduleCtrl.scheduleDelete)
// 일정 수정
router.put("/", scheduleCtrl.scheduleUpdate)
// 일정 하나만 불러오기
router.get("/one", scheduleCtrl.scheduleOne)
// 일정 전부 불러오기
router.get("/", scheduleCtrl.scheduleAll)

router.post("/list", scheduleCtrl.addUser) // 프로젝트 참여자 목록

module.exports = router
