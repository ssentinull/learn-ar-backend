const crypto = require('crypto');
const TreasureModel = require('../models/treasure.model');
const TokenModel = require('../models/token.model');
const UserModel = require('../models/user.model');

const createUser = async (req, res) => {
  const randomNumber = Math.random().toString();
  const currentDate = (new Date().getTime()).toString();
  const sha1 = crypto.createHash('sha1')
    .update(currentDate + randomNumber);
  
  try{
    const newUser = new UserModel({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      treasures: []
    });

    newUser.save((err, user) => {
      if(err){
        console.log('Error: ' + err);
        return res.status(400).json({error: err.message});
      }

      const newToken = new TokenModel({
        value: sha1.digest('hex'),
      });

      newToken.save();

      return res.status(200).header('Authorization', newToken.value).json(user);
    });

  } catch (err) {
    
    console.log('Error: ' + err);
    return res.status(400).json({error: err.message}); 
  }
}

const readUser = (req, res) => {
  try{
    const { id } = req.params;

    // get all treasure
    TreasureModel.find((trsErr, trs) => {
      if (trsErr) {
        console.error(trsErr);
        return res.status(500).json({ error: 'system error' });
      }

      UserModel.findById(id, (err, user) => {
        if(err) {
          console.error(err)
          return res.status(500).json({ error: 'system error' });
        }

        for (let i = 0; i < trs.length; i++) {
          for (let j = 0; j < user.treasures.length; j++) {
            if (user.treasures[j]._id +'' === trs[i]._id +'') {
              trs[i].isUnlocked = true
            }
          }
        }

        const userData = user
        userData.treasures = [...trs]

        return res.status(200).json(userData)

      });    
    })
  } catch (err) {
    console.log('Error: ' + err);
    return res.status(500).json({ error: 'system error' })
  }
}

const test = (req, res) => {
  res.send('Testing user controller!');
};

module.exports = {
  createUser,
  readUser,
  test,
}
