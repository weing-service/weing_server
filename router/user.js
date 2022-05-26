const express = require("express")
const router = express.Router()
const userCtrl = require("../controller/user")

router.get("/", userCtrl.getAllUsers) // 전체 사용자 조회

module.exports = router
