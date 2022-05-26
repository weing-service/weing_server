const UserModel = require("../data/user.js")

exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find({})
  res.json({ allUsers: users })
}
