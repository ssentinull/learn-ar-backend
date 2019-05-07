const Treasure = require('../models/treasure.model');

exports.init = (req, res) => {

  const usbu = new Treasure({
    name: 'USBU',
    description: 'Unit Sepak Bola Unpad',
    url: 'https://www.facebook.com/pages/Unit-Sepakbola-UNPAD/170110036340931'
  });

  usbu.save((err) => {

    if(err){
      return console.error(err.stack);
    }

    console.log('USBU successfully added');
  });

  const ubtu = new Treasure({
    name: 'UBTU',
    description: 'Unit Bulutangkis Unpad',
    url: 'https://www.facebook.com/pages/UBTU-Unit-Bulutangkis-Unpad-/174322935922119'
  });

  ubtu.save((err) => {

    if(err){
      return console.error(err.stack);
    }
    
    console.log('UBTU successfully added');
  });

  res.send("Done inserting inital data!");
}