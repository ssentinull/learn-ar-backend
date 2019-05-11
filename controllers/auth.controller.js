const crypto = require('crypto');
const TokenModel = require('../models/token.model');
const UserModel = require('../models/user.model');

const login = (req, res) => {
  const { email, password } = req.body;
  
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
    
    const randomNumber = Math.random().toString();
    const currentDate = (new Date()).valueOf().toString();
    const tokenValue = crypto.createHash('sha1').update(currentDate + randomNumber).digest('hex');
    
    const newToken = new TokenModel({
      value: tokenValue
    });

    newToken.save((err, token) => {
      if(err){
        console.log('Error: ' + err);
        return res.status(400).json({error: err.message});
      }

      return res.status(200).header('Authorization', token.value).json(user);
    });
  });
};

module.exports = { login };