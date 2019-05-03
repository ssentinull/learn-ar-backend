const UserModel = require('../models/user.model');

const login = (req, res) => {
  const {email, password} = req.body;
  
  UserModel.findOne({ email }, (err, user) => {
    if (err) {
      console.error(err)
      return res.status(500).json({ error: "system error" });
    }

    if (!user) {
      return res.status(400).json({ error: 'user not found' });
    } 

    if (user.password !== password) {
      return res.status(400).json({ error: "password not match" });
    }

    return res.status(200).json(user)
  })
};

module.exports = { login };