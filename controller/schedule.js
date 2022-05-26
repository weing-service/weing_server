const Schedule = require("../data/schedule")
const loginCtrl = require("./middlewares")

// 일정 생성
exports.scheduleSave = async (req, res) => {
  if (loginCtrl.isLoggedIn) {
    const {
      project,
      title,
      info,
      startDate,
      finishDate,
      category,
      intoCal,
      repeated,
    } = req.body
    const isCompleted = false
    new Schedule({
      project, //프로젝트 명
      title, //일정 제목
      info,
      startDate,
      finishDate,
      category,
      intoCal,
      repeated,
      isCompleted,
    }).save((err, result) => {
      if (err) return res.status(500).send(err)
      res.status(201).json(result)
    })
  }
}

// 일정 삭제
exports.scheduleDelete = async (req, res) => {
  if (loginCtrl.isLoggedIn) {
    await Schedule.findOneAndDelete({project: req.body.project, title: req.body.title})
      .then(() => {
        res.json({ message: "삭제 성공!" })
      })
      .catch((err) => res.status(500).send(err))
  }
}

// 일정 수정
exports.scheduleUpdate = async (req, res) => {
  if (loginCtrl.isLoggedIn) {
    await Schedule.findOneAndUpdate({project: req.body.ex_project, title: req.body.ex_title}, 
      {
        project: req.body.project,
        title: req.body.title,
        info: req.body.info,
        startDate: req.body.startDate,
        finishDate: req.body.finishDate,
        category: req.body.category,
        intoCal: req.body.intoCal,
        repeated: req.body.repeated,
        isCompleted: req.body.isCompleted
      })
      .then(() => {
        res.json({ message: "수정 성공!" })
      })
      .catch((err) => res.status(500).send(err))
  }
}

// 일정 1개 불러오기
exports.scheduleOne = async (req, res) => {
  await Schedule.findOne({ project: req.body.project, title: req.body.title })
    .then((scheduleone) => {
      if (!scheduleone)
        return res.json({ message: "존재하지 않는 일정입니다." })
      res.json(scheduleone)
    })
    .catch((err) => res.status(500).send(err))
}

// 일정 모두 불러오기
exports.scheduleAll = async (req, res) => {
  await Schedule.find({project : req.body.project})
    .then((scheduleall) => {
      if (!scheduleall) return res.json({ message: "일정이 없습니다." })
      res.json({ data: scheduleall })
    })
    .catch((err) => res.status(500).send(err))
}

// 일정 완료
exports.complete = async (req, res) => {
  if (loginCtrl.isLoggedIn) {
    await Schedule.findOneAndUpdate({project: req.body.project, title: req.body.title}, { isCompleted: true })
    res.json({ message: "일정 완료!" })
  }
}
