const crypto = require('crypto');
const TreasureModel = require('../models/treasure.model');
const TokenModel = require('../models/token.model');
const UserModel = require('../models/user.model');

const createUser = async (req, res, next) => {
  const randomNumber = Math.random().toString();
  const currentDate = (new Date().getTime()).toString();
  const sha1 = crypto.createHash('sha1')
    .update(currentDate + randomNumber);
  
  try{
    const { name, email, password } = req.body;
    
    if(!(name && email && password)){
      const err = new Error('some of the inputs are not filled');
      err.status = 400;
      
      next(err);
    }

    const newUser = new UserModel({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      treasures: []
    });

    newUser.save((err, user) => {
      if(err){
        err.status = 400;      
        next(err);
      }

      const newToken = new TokenModel({
        value: sha1.digest('hex'),
      });

      newToken.save();

      return res.status(200).header('Authorization', newToken.value).json(user);
    });

  } catch (err) {
    err.status = 400;      
    next(err);
  }
}

// return user data with all (locked & unlocked) treasures
// an unlocked treasure is a treasure that already added to user
const readUser = (req, res, next) => {
  try{
    const { id } = req.params;

    if(!id){
      const err = new Error('the user id is not set');
      err.status = 400;
      
      next(err);
    }

    // merge user treasure with all treasures
    TreasureModel.find((trsErr, trs) => {
      if (trsErr) {
        trsErr.status = 500;
        next(trsErr);
      }

      UserModel.findById(id, (err, user) => {
        if(err) {
          err.status = 500;
          next(err);
        }

        // made isUnlocked true if treasure already added to user
        for (let i = 0; i < trs.length; i++) {
          for (let j = 0; j < user.treasures.length; j++) {
            // id can only be compare in string format
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
    err.status = 500;
    next(err);
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
