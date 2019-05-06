const TreasureModel = require('../models/treasure.model');
const UserModel = require('../models/user.model');

const createUser = (req, res) => {
  try{
    const newUser = new UserModel({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    newUser.save((err, user) => {
      if(err){
        console.log('Error: ' + err);
        return res.status(400).json({error: err.message});
      }

      return res.status(200).json(newUser);
    });
  } catch (err) {
    
    console.log('Error: ' + err);
    return res.status(400).json({error: err.message}); 
  }
}

const pushTreasure = async (req, res) => {
  try{
    const { userId, treasureId } = req.params;
    
    const treasure = await TreasureModel.findById(treasureId).exec();
    
    UserModel.findById(userId, (err, user) => {
      if(err){
        console.log('Error: ' + err);
        return res.status(400).json({error: err.message});
      }

      user.treasures.push(treasure);
      user.save();

      return res.status(200).json(user);
    });
    
  } catch(err){
    console.log('Error: ' + err);
    return res.status(400).json({error: err.message});
  }
}

const readUser = (req, res) => {
  try{
    const id = req.params.id;

    UserModel.findById(id, (err, user) => {
      if(err){
        console.log('Error: ' + err);
        return res.status(400).json({error: err.message});
      }

      return res.status(200).json(user);
    });
  } catch (err) {
    console.log('Error: ' + err);
    return res.status(400).json({error: err.message});
  }
}

const test = (req, res) => {
  res.send('Testing user controller!');
};

module.exports = {
  createUser,
  pushTreasure,
  readUser,
  test,
}
