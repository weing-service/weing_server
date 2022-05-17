const VoteModel = require("../data/vote.js")
const _ = require("underscore")

// 투표 생성
exports.createVote = async (req, res) => {
  const { title, info, voteDate, startTime, endTime, finishDate } = req.body
  const createdDate = Date.now()

  if (!title) return res.status(400).send("제목을 입력해주세요!")

  new VoteModel({
    title: title,
    info: info,
    voteDate: voteDate,
    startTime: startTime,
    endTime: endTime,
    finishDate: finishDate,
    createdDate: createdDate,
  }).save((err, result) => {
    if (err) return res.status(500).send(err)
    res.status(201).json(result)
  })
}

// 투표 수정
exports.editVote = async (req, res) => {
  const voteId = req.params.voteId
  await VoteModel.findByIdAndUpdate(voteId, req.body)
    .then(() => {
      res.json({ message: "수정 성공!" })
    })
    .catch((err) => res.status(500).send(err))
}

// 투표 삭제
exports.delVote = async (req, res) => {
  const voteId = req.params.voteId
  await VoteModel.findByIdAndDelete(voteId).then(() => {
    res.json({ message: "삭제 성공!" })
  })
}

// 투표 하나 불러오기
exports.getVote = async (req, res) => {
  const voteId = req.params.voteId
  const data = await VoteModel.findById(voteId)
  res.json(data)
}

// 투표하기 - 수정 필요
exports.doVote = (req, res) => {
  const { user1, user2, user3 } = req.body
  const data = _.intersection(user1, user2, user3)
  res.json(data)
}
