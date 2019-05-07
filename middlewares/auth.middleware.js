const UserModel = require('../models/user.model');

const checkUserToken = (req, res, next) => {
  const token = req.get('Authorization');

  if(typeof token === 'undefined'){
    const err = new Error('The token is not set!');
    err.status = 400;
    return next(err);
  }

  UserModel.find({token: token}, (err, user) => {
    if(err){
      return next(err);
    } else {
      if(!user.length){
        const err = new Error('The token doesn\'t exist in our DB!');
        err.status = 400;
        return next(err);
      } else{   
        return next();
      }
    }
  });
}

module.exports = { checkUserToken }