const schedule = require("../data/schedule")

// 일정 생성
exports.scheduleSave = async (req, res) => {
  const { title, info, startDate, finishDate, category, intoCal, repeated } =
    req.body
  new schedule({
    title,
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
