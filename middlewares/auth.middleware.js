const TokenModel = require('../models/token.model');

const user = (req, res, next) => {
  const token = req.get('Authorization');

  if(!token){
    return res.status(400).json({error: 'The token is not set!'});
  }

  TokenModel.findOne({ value: token }, (err, token) => {
    if(err){
      console.error(err)
      return res.status(400).json({error: 'System error'});
    }

    if(!token){
      console.log(token)
      return res.status(400).json({error: 'The token doesn\'t exist in our DB!'});
    }    
    
    return next();
  });
}

module.exports = { user }