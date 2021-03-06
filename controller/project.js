const ProjectModel = require("../data/project.js")
const ImageModel = require("../data/coverImg.js")
const UserModel = require("../data/user.js")
const ScheduleModel = require("../data/schedule.js")
const loginCtrl = require("./middlewares")
const passport = require("passport")

// 프로젝트 생성
exports.createProject = async (req, res) => {
  //if (loginCtrl.isLoggedIn) {
    console.log("로그인한 유저")
    const users = []
    const { title, info, startDate, finishDate, coverImg, profileImg } =
      req.body
    const coverImage = await ImageModel.findOne({ savedName: coverImg })
    const profileImage = await ImageModel.findOne({ savedName: profileImg })

    if (!title) return res.status(400).send("제목을 입력해주세요!")

    new ProjectModel({
      title: title,
      info: info,
      users: users,
      startDate: startDate,
      finishDate: finishDate,
      coverImg: coverImage,
      profileImg: profileImage,
    }).save((err, result) => {
      if (err) return res.status(500).send(err)
      res.status(201).json(result)
    })
  //} else {
  //  res.json({ message: "로그인 하지 않은 유저입니다." })
  //}
}

// 프로젝트 수정
exports.editProject = async (req, res) => {
  //if (loginCtrl.isLoggedIn) {
    console.log("로그인한 유저")
    await ProjectModel.findOneAndUpdate(
      { title: req.body.pjTitle },
      {
        title: req.body.title,
        info: req.body.info,
        startDate: req.body.startDate,
        finishDate: req.body.finishDate,
      }
    )
      .then(() => {
        res.json({ message: "수정 성공!" })
      })
      .catch((err) => res.status(500).send(err))
  //}
}

// 프로젝트 삭제
exports.delProject = async (req, res) => {
  //if (loginCtrl.isLoggedIn) {
    const title = req.body.title
    await ProjectModel.findOneAndDelete({ title: title }).then(() => {
      res.json({ message: "삭제 성공!" })
    })
  //}
}

// 프로필 이미지 등록
exports.profileImg = async (req, res) => {
  //if (loginCtrl.isLoggedIn) {
    const profileImage = req.file.path
    const data = req.file
    console.log(data)

    new ImageModel({
      originalFileName: data.originalname,
      serverFileName: data.filename,
      savedName: data.originalname + Date.now(),
      size: data.size,
      category: "profileImg",
    }).save((err, result) => {
      if (err) return res.status(500).send(err)
      res.status(201).json(result)
    })

    if (profileImage === undefined) {
      return res.status(400).json({ message: "undefined" })
    }
  //}
}

// 커버 이미지 등록
exports.coverImg = async (req, res) => {
  //if (loginCtrl.isLoggedIn) {
    const coverImage = req.file.path
    const data = req.file
    console.log(data)

    new ImageModel({
      originalFileName: data.originalname,
      serverFileName: data.filename,
      savedName: data.originalname + Date.now(),
      size: data.size,
      category: "coverImg",
    }).save((err, result) => {
      if (err) return res.status(500).send(err)
      res.status(201).json(result)
    })

    if (coverImage === undefined) {
      return res.status(400).json({ message: "undefined" })
    }
  //}
}

// 프로젝트 하나 불러오기 & 해당 프로젝트의 모든 일정 불러오기
exports.getProject = async (req, res) => {
  const title = req.body.title
  const project = await ProjectModel.findOne({ title: title })
  const data = await ScheduleModel.find({ project: title })

  const schedules = project.schedules

  for (const schedule of data) {
    schedules.push(schedule)
  }

  res.json({ data: project })
}

// 로그인한 유저의 모든 프로젝트 불러오기
exports.getAllProjects = async (req, res) => {
  //if (loginCtrl.isLoggedIn) {
    //console.log(passport.session.id)
    const projects = await ProjectModel.find({
      users: { $elemMatch: { id: req.body.id } },
    })

    res.json({ data: projects })
  //}
}

// 참여자 추가
exports.addUser = async (req, res) => {
  //if (loginCtrl.isLoggedIn) {
    const title = req.body.title
    const username = req.params.username
    const newUser = await UserModel.findOne({ username: username })
    await ProjectModel.findOneAndUpdate(
      { title: title },
      {
        $push: { users: newUser },
      }
    )
    res.json({ message: "참여자 추가 완료!" })
  //}
}

// 참여자 삭제
exports.delUser = async (req, res) => {
  //if (loginCtrl.isLoggedIn) {
    const title = req.body.title
    const username = req.params.username
    await ProjectModel.findOneAndUpdate(
      { title: title },
      {
        $pull: { users: { username: username } },
      }
    )
    res.json({ message: "참여자 삭제 완료!" })
  //}
}

// 예정된 일정 개수, 완료된 일정 개수 가져오기
exports.countSchedule = async (req, res) => {
  const date = req.params.date
  const project = req.params.project
  const appointedCount = await ScheduleModel.countDocuments({
    project: project,
    startDate: date,
    isCompleted: false,
  })
  const completedCount = await ScheduleModel.count({
    project: project,
    startDate: date,
    isCompleted: true,
  })
  res.json([
    { appointedCount: appointedCount },
    { completedCount: completedCount },
  ])
}
