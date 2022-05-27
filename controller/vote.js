const VoteModel = require("../data/vote.js")
const UserModel = require("../data/user")
const Vote_infoModel = require("../data/voteinfo")
const ProjectModel = require("../data/project")
const loginCtrl = require("./middlewares")
const passport = require("passport")
const { Router } = require("express")

// 투표 생성
exports.createVote = async (req, res) => {
  // if (loginCtrl.isLoggedIn) {
  const {
    project,
    title,
    info,
    startDate,
    endDate,
    deadLine,
    intoCal,
    isCompleted,
  } = req.body
  const projectData = await ProjectModel.findOne({ title: project })
  const userArr = projectData.users
  let userIds = []

  for (user of userArr) {
    userIds.push(user.id)
  }

  if (!title) return res.status(400).send("내용을 입력해주세요!")

  new VoteModel({
    project: project,
    title: title,
    info: info,
    startDate: startDate,
    endDate: endDate,
    deadLine: deadLine,
    intoCal: intoCal,
    isCompleted: isCompleted,
    userIds: userIds,
  }).save((err, result) => {
    if (err) return res.status(500).send(err)
    res.status(201).json(result)
  })
  // }
}

// 투표 수정
exports.editVote = async (req, res) => {
  //if (loginCtrl.isLoggedIn) {
  //console.log(passport.session.id)
  await UserModel.find({ id: req.body.id })
    .then((editVote) => {
      if (!editVote) return res.json({ message: "수정할 투표 없음" })

      const voteId = req.params.voteId
      VoteModel.findByIdAndUpdate(voteId, req.body)
        .then(() => {
          res.json({ message: "수정 성공!" })
        })
        .catch((err) => res.status(500).send(err))
    })
    .catch((err) => res.status(500).send(err))
  //}
}

// 투표 삭제
exports.delVote = async (req, res) => {
  //if (loginCtrl.isLoggedIn) {
  //console.log(passport.session.id)
  UserModel.find({ id: req.body.id }).then((delVote) => {
    if (!delVote) return res.json({ message: "삭제할 투표 없음" })
    const voteId = req.params.voteId
    VoteModel.findByIdAndDelete(voteId).then(() => {
      res.json({ message: "삭제 성공!" })
    })
  })
  //}
}

// 투표 하나 불러오기
exports.getVote = async (req, res) => {
  const voteId = req.params.voteId
  const data = await VoteModel.findById(voteId)
  res.json(data)
}

// 투표하기
exports.doVote = async (req, res) => {
  // req: 프로젝트 이름, 투표 이름, 투표시간(array), 투표장소(array), 몇차 투표인지(number)
  //if (loginCtrl.isLoggedIn) {
  //console.log(passport.session.id)
  await Vote_infoModel.findOne({
    user_id: req.body.id,
    vote_title: req.body.vote_title,
    vote_count: req.body.vote_count,
  }).then((exVote) => {
    if (!exVote) {
      new Vote_infoModel({
        project_title: req.body.project_title,
        vote_title: req.body.vote_title, // 투표 제목
        vote_count: req.body.vote_count,
        user_id: req.body.user_id,
        vote_time: req.body.vote_time, // 투표한 시간
        place: req.body.place,
      }).save((err, result) => {
        if (err) return res.status(500).send(err)
        res.status(201).json(result)
      })
    } else {
      return res.json({ message: "이미 투표 완료한 사용자입니다." })
    }
  })
  //}
}

// 진행 중인 투표 받기
exports.doingVote = async (req, res) => {
  const { project_title, userId } = req.body
  const doingVotes = await VoteModel.find({
    project: project_title,
    deadLine: { $gte: Date.now() },
  })

  const myVotes = await Vote_infoModel.find({
    user_id: userId,
    project_title: project_title,
  })

  console.log("doing", doingVotes)
  console.log("my", myVotes)

  const doneList = []
  const doingList = []

  for (let i = 0; i < doingVotes.length; i++) {
    for (let j = 0; j < myVotes.length; j++) {
      if (doingVotes[i].title == myVotes[j].vote_title) {
        doneList.push(doingVotes[i])
      }
    }

    if (!doneList.includes(doingVotes[i])) {
      doingList.push(doingVotes[i])
    }
  }

  res.json({ doneList: doneList, doingList: doingList })
}

// 중간 지점 찾기
exports.midPoint = async (req, res) => {
  const x_array = []
  const y_array = []
  let x_sum = 0
  let y_sum = 0
  const project = await ProjectModel.findOne({
    title: req.body.title,
  })
  const user_array = project.users
  for (const user of user_array) {
    const data = await Vote_infoModel.find({
      user_id: user.id,
    })
    x_array.push(data[0].x)
    y_array.push(data[0].y)
  }

  for (let i = 0; i < x_array.length; i++) {
    x_sum += x_array[i]
  }

  for (let i = 0; i < y_array.length; i++) {
    y_sum += y_array[i]
  }

  const x_average = x_sum / x_array.length
  const y_average = y_sum / y_array.length
  res.json({ x_average: x_average, y_average: y_average })
}

// 중복 시간대 찾기
exports.commonTime = async (req, res) => {
  const votes = await Vote_infoModel.find({
    project_title: req.body.project_title,
    vote_title: req.body.vote_title,
    vote_count: req.body.vote_count,
  })

  let votedata = []
  let days = []

  let data = {}
  let voteArr = []
  let result = {}

  for (const vote of votes) {
    votedata.push(vote.vote_time)
    days = Object.keys(vote.vote_time)
  }

  for (let i = 0; i < days.length; i++) {
    for (let j = 0; j < votedata.length; j++) {
      voteArr.push(votedata[j][days[i]])
      data[days[i]] = voteArr
    }
    voteArr = []
  }

  console.log(data)

  // for (let i = 0; i < votes.length - 1; i++) {
  //   result[days[i]] = data[days[i]]]
  //   // real_times[i][i].filter((x) => real_times[i][i].includes(x))

  // }

  // console.log(result[real_days[0]] = data[days])
  // result[real_days[i]] = real_times[i][i].filter((x) =>
  //   real_times[i + 1][i + 1].includes(x)
  // )
  // }

  // const real_days = Object.keys(data)
  // const real_times = Object.values(data)
  // console.log(real_days)
  // console.log(real_times[0][0]) // 0 0이 0 1 이랑 1 0이 1 1이랑

  // for (let i = 0; i < votes.length; i++) {
  //   for (let j = 0; j < votes.length + 1; j++) {
  //     console.log(real_times[i][j])
  //     console.log(real_times[i][j + 1])
  //     console.log(
  //       real_times[i][j].filter((x) => real_times[i][j + 1].includes(x))
  //     )
  //   }
  // }

  // for (let i = 0; i < votes.length; i++) {
  //   for (let j = 0; j < votes.length; j++) {
  //     console.log(real_times[i][j])
  //     console.log(real_times[i][j].filter((x) => real_times[i][j].includes(x)))
  //   }
  // }

  // for (let i = 0; i < votes.length - 1; i++) {
  //   console.log(real_times[i])
  //   console.log(
  //     real_times[i][i].filter((x) => real_times[i][i].includes(x))
  //   )

  // result[real_days[i]] = real_times[i][i].filter((x) =>
  //   real_times[i + 1][i + 1].includes(x)
  // )
  // }

  // console.log(result)
  // for (let i = 0; i < votedata.length - 1; i++) {
  //   result = times[i].filter((x) => times[i + 1].includes(x))
  // }

  //   res.json(result)
}
