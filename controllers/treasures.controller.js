const TreasureModel = require('../models/treasure.model');
const UserModel = require('../models/user.model');

const pushTreasure = async (req, res) => {
  try{
    const { userId, treasureId } = req.params;
    
    const treasure = await TreasureModel.findById(treasureId).exec();
    
    UserModel.findById(userId, (err, user) => {
      if(err){
        console.log('Error: ' + err);
        return res.status(400).json({error: err.message});
      }
      
      // if user.treasures empty, add new treasure
      if (user.treasures.length === 0) {
        treasure.isUnlocked = true
        user.treasures.push(treasure)
        user.save();
  
        return res.status(200).json(user);        
      }

      // if treasure exists in users, don't add it
      const isExist = user.treasures.every(t => t._id !== treasureId)
      if (isExist) {
        return res.status(400).json({ message: "treasure already added" });
      }

      // add unlocked treasure to user's treasures
      treasure.isUnlocked = true
      user.treasures.push(treasure)
      user.save();

      return res.status(200).json(user);
    });
    
  } catch(err){
    console.log('Error: ' + err);
    return res.status(400).json({error: err.message});
  }
}

const readTreasures = (req, res) => {
  try{
    TreasureModel.find().then(treasures => res.status(200).json(treasures));
  } catch(err){
    console.log('Error: ' + err);
    return res.status(400).json({error: err.message});
  }
}

module.exports = {
  pushTreasure, 
  readTreasures 
}