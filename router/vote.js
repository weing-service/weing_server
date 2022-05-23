const express = require("express")
const router = express.Router()
const voteCtrl = require("../controller/vote.js")

router.post("/vote", voteCtrl.createVote) // 투표 생성
router.put("/:voteId", voteCtrl.editVote) // 투표 수정
router.delete("/:voteId", voteCtrl.delVote) // 투표 삭제
router.get("/:voteId", voteCtrl.getVote) // 투표 하나 불러오기
router.post("/vote/result", voteCtrl.doVote) // 투표하기
module.exports = router
