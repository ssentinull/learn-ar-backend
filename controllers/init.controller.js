const Treasure = require('../models/treasure.model');

exports.init = (req, res) => {

  const usbu = new Treasure({
    name: 'USBU',
    description: 'Unit Sepak Bola Unpad'
  });

  usbu.save((err) => {

    if(err){
      return console.error(err.stack);
    }

    console.log('USBU successfully added');
  });

  const ubu = new Treasure({
    name: 'UBU',
    description: 'Unit Bulutangkis Unpad'
  });

  ubu.save((err) => {

    if(err){
      return console.error(err.stack);
    }
    
    console.log('UBU successfully added');
  });

  res.send("Done Initial Data!");
}