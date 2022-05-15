const ProjectModel = require("../data/project.js")
const ImageModel = require("../data/coverImg.js")

// 프로젝트 생성
exports.createProject = async (req, res) => {
  const { title, info, finishDate, coverImg } = req.body
  const imgFile = await ImageModel.findOne({ savedName: coverImg })

  if (!title) return res.status(400).send("제목을 입력해주세요!")

  new ProjectModel({
    title: title,
    info: info,
    finishDate: finishDate,
    coverImg: imgFile,
  }).save((err, result) => {
    if (err) return res.status(500).send(err)
    res.status(201).json(result)
  })
}

// 프로젝트 수정 (항목 추가해야 함)
exports.editProject = async (req, res) => {
  const projectId = req.params.projectId
  const { title, info } = req.body

  const data = await ProjectModel.findById(projectId)

  const edited = await data.overwrite({ title: title, info: info })
  res.status(200).json(edited)
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
