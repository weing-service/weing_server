const VoteModel = require("../data/vote.js")

// 투표 생성
exports.createVote = (req, res) => {
  const { title, info } = req.body
  const voteDate = new Date(2022, 5, 16) // 임의로 설정
  const startTime = new Date(2022, 5, 16, 2, 0, 0) // 임의로 설정
  const endTime = new Date(2022, 5, 16, 5, 0, 0) // 임의로 설정
  const finishDate = new Date(2022, 5, 23) // 임의로 설정

  const isFinished = false

  if (!title) return res.status(400).send("제목을 입력해주세요!")

  new VoteModel({
    title: title,
    info: info,
    voteDate: voteDate,
    startTime: startTime,
    endTime: endTime,
    finishDate: finishDate,
    isFinished: isFinished,
  }).save((err, result) => {
    if (err) return res.status(500).send(err)
    res.status(201).json(result)
  })
}

// 투표 수정 (항목 추가해야 함)
exports.editVote = async (req, res) => {
  const voteId = req.params.voteId
  const { title, info } = req.body

  const data = await VoteModel.findById(voteId)

  const edited = await data.overwrite({ title: title, info: info })
  res.status(200).json(edited)
}

// 투표 삭제
exports.delVote = async (req, res) => {
  const voteId = req.params.voteId
  await VoteModel.findByIdAndDelete(voteId).then(() => {
    res.json({ message: "삭제 성공!" })
  })
}
