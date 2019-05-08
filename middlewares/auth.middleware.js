const UserModel = require('../models/user.model');

const user = (req, res, next) => {
  const token = req.get('Authorization');

  if(!token){
    const err = new Error('The token is not set!');
    err.status = 400;
    return next(err);
  }

  UserModel.find({token: token}, (err, user) => {
    if(err){
      return next(err);
    }

    if(!user.length){
      const err = new Error('The token doesn\'t exist in our DB!');
      err.status = 400;
      return next(err);
    }    
    
    return next();
  });
}

module.exports = { user }