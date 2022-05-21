const Schedule = require("../data/schedule")

// 일정 생성
exports.scheduleSave = async (req, res) => {
    const {project, title, info, startDate, finishDate, category, intoCal, repeated } = req.body
    new Schedule({
        project, //프로젝트 명
        title, //일정 제목
        info,
        startDate,
        finishDate,
        category,
        intoCal,
        repeated,
    }).save((err, result) => {
        if (err) return res.status(500).send(err)
        res.status(201).json(result)
    })
}

// 일정 삭제
exports.scheduleDelete = async (req, res) => {
    const scheduleId = req.params.scheduleId
    await Schedule.findByIdAndDelete(scheduleId).then(() => {
        res.json({message: "삭제 성공!"})
    })
    .catch(err => res.status(500).send(err));
}

// 일정 수정
exports.scheduleUpdate = async (req, res) => {
    await Schedule.findByIdAndUpdate(req.params.scheduleId, req.body)
    .then(() => {
        res.json({message: "수정 성공!"})
    })
    .catch(err => res.status(500).send(err));
}

// 일정 1개 불러오기
exports.scheduleOne = async (req, res) => {
    await Schedule.find({_id: req.params.scheduleId})
    .then((scheduleone) => {
        if(!scheduleone) return res.json({message: "존재하지 않는 일정입니다."})
        res.json(scheduleone)
    })
    .catch(err => res.status(500).send(err))
}

// 일정 모두 불러오기
exports.scheduleAll = async (req, res) => {
    await Schedule.find()
    .then((scheduleall) => {
        if(!scheduleall) return res.json({message: "일정이 없습니다."})
        res.json(scheduleall)
    })
    .catch(err => res.status(500).send(err))
}