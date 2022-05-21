var router = require("express").Router()
const scheduleCtrl = require("../controller/schedule")

// 일정 생성
router.post("/", scheduleCtrl.scheduleSave)
// 일정 삭제
router.delete("/:scheduleId", scheduleCtrl.scheduleDelete)
// 일정 수정
router.put("/:scheduleId", scheduleCtrl.scheduleUpdate)
// 일정 완료
router.put("/:scheduleId/done", scheduleCtrl.complete)
// 일정 하나만 불러오기
router.get("/:scheduleId", scheduleCtrl.scheduleOne)
// 일정 전부 불러오기
router.get("/", scheduleCtrl.scheduleAll)

module.exports = router
