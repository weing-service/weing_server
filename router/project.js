const express = require("express")
const router = express.Router()
const multer = require("multer")
const projectCtrl = require("../controller/project.js")
const loginCtrl = require("../controller/middlewares")
const passport = require("passport")
const upload = multer({
  dest: "uploads/",
})

router.post(
  "/profileImg",
  upload.single("profileImage"),
  projectCtrl.profileImg
) // 프로젝트 프로필 이미지 등록
router.post("/coverImg", upload.single("coverImage"), projectCtrl.coverImg) // 커버 이미지 등록
router.post("/", projectCtrl.createProject) // 프로젝트 생성
router.post("/user", projectCtrl.getAllProjects) // 로그인한 유저의 프로젝트 모두 불러오기
router.put("/", projectCtrl.editProject) // 프로젝트 수정
router.delete("/", projectCtrl.delProject) // 프로젝트 삭제
router.get("/one", projectCtrl.getProject) // 프로젝트 하나 불러오기
router.get("/:project/:date", projectCtrl.countSchedule) // 예정된 일정 개수, 완료된 일정 개수 세기
router.post("/:username", projectCtrl.addUser) // 프로젝트 팀원 추가
router.put("/:username", projectCtrl.delUser) // 프로젝트 팀원 삭제

module.exports = router
