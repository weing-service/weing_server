const express = require("express")
const router = express.Router()
const voteCtrl = require("../controller/vote.js")

router.post("/votes", voteCtrl.createVote) // 투표 생성
router.put("/:voteId", voteCtrl.editVote) // 투표 수정
// router.put("/finish/:voteId", voteCtrl.setFinish) // 투표 마감일 설정(수정 필요)
router.delete("/:voteId", voteCtrl.delVote) // 투표 삭제

module.exports = router
