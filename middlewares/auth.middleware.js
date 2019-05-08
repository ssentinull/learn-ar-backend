const UserModel = require('../models/user.model');

const user = (req, res, next) => {
  const token = req.get('Authorization');

  if(!token){
    return res.status(400).json({error: 'The token is not set!'});
  }

  UserModel.find({token: token}, (err, user) => {
    if(err){
      console.error(err)
      return res.status(400).json({error: 'System error'});
    }

    if(!user.length){
      return res.status(400).json({error: 'The token doesn\'t exist in our DB!'});
    }    
    
    return next();
  });
}

module.exports = { user }