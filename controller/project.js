const ProjectModel = require("../data/project.js")
const ImageModel = require("../data/coverImg.js")
const UserModel = require("../data/user.js")

// 프로젝트 생성
exports.createProject = async (req, res) => {
  const users = []
  const { title, info, finishDate, coverImg } = req.body
  const imgFile = await ImageModel.findOne({ savedName: coverImg })

  if (!title) return res.status(400).send("제목을 입력해주세요!")

  new ProjectModel({
    title: title,
    info: info,
    users: users,
    finishDate: finishDate,
    coverImg: imgFile,
  }).save((err, result) => {
    if (err) return res.status(500).send(err)
    res.status(201).json(result)
  })
}

// 프로젝트 수정
exports.editProject = async (req, res) => {
  const projectId = req.params.projectId
  await ProjectModel.findByIdAndUpdate(projectId, req.body)
    .then(() => {
      res.json({ message: "수정 성공!" })
    })
    .catch((err) => res.status(500).send(err))
}

// 프로젝트 삭제
exports.delProject = async (req, res) => {
  const projectId = req.params.projectId
  await ProjectModel.findByIdAndDelete(projectId).then(() => {
    res.json({ message: "삭제 성공!" })
  })
}

// 커버 이미지 등록
exports.coverImg = async (req, res) => {
  const image = req.file.path
  const data = req.file
  console.log(data)

  new ImageModel({
    originalFileName: data.originalname,
    serverFileName: data.filename,
    savedName: data.originalname + Date.now(),
    size: data.size,
  }).save((err, result) => {
    if (err) return res.status(500).send(err)
    res.status(201).json(result)
  })

  if (image === undefined) {
    return res.status(400).json({ message: "undefined" })
  }
}

// 프로젝트 하나 불러오기
exports.getProject = async (req, res) => {
  const projectId = req.params.projectId
  const data = await ProjectModel.findById(projectId)
  res.json(data)
}

// 참여자 추가
exports.addUser = async (req, res) => {
  const projectId = req.params.projectId
  const userId = req.params.userId
  const newUser = await UserModel.findById(userId)
  const project = await ProjectModel.findByIdAndUpdate(projectId, {
    $push: { users: newUser },
  })
  res.json({ message: "참여자 추가 완료!" })
}
