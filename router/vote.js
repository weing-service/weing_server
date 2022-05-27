const express = require("express")
const router = express.Router()
const voteCtrl = require("../controller/vote.js")

router.post("/", voteCtrl.createVote) // 투표 생성
router.get("/mid", voteCtrl.midPoint) // 중간 지점 찾기
router.post("/result", voteCtrl.doVote) // 투표하기
router.get("/common", voteCtrl.commonTime) // 겹치는 시간 구하기
router.put("/:voteId", voteCtrl.editVote) // 투표 수정
router.delete("/:voteId", voteCtrl.delVote) // 투표 삭제
router.get("/:voteId", voteCtrl.getVote) // 투표 하나 불러오기

module.exports = router
