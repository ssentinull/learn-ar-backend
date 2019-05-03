const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

const config = {
  PORT: process.env.PORT || '8080',
  ENV: process.env.NODE_ENV || 'development',
  DB_URL: process.env.DB_URL || 'mongodb://localhost:27017/learn-ar',
}

// connect to db
mongoose.connect(config.DB_URL, {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('connect to mongodb');

  const treasureList = [
    {
      id: 1,
      name: "UBBU",
      desc: "aodadaoidaod"
    },
    {
      id: 2,
      name: "USBU",
      desc: "tralalalal"
    }
  ];

  const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    treasure: Array
  });
  
  const UserModel = mongoose.model('User', userSchema);

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.get('/api/ping', (req, res) => res.status(200).json({ message: 'pong' }));

  app.post('/user', (req, res) => {
    try{
      const user = new UserModel({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        treasure: []
      });

      user.save((err, user) => {
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
  });

  app.post('/login', (req, res) => {
    const {email, password} = req.body;
    
    // auth email & password
    UserModel.findOne({ email }, (err, user) => {
      if (err) {
        console.error(err)
        return res.status(500).json({ error: "system error" });
      }

      if (!user) {
        return res.status(400).json({ error: 'user not found' });
      } 

      if (user.password !== password) {
        return res.status(400).json({ error: "password not match" });
      }

      return res.status(200).json(user)
    })
  });

  app.get('/user/:id', (req, res) => {
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
  });

  app.post('/user/:id/treasure/:treasureId', (req, res) => {
    try{
      const { id, treasureId } = req.params;
      console.log(treasureId);

      UserModel.findById(id, (err, user) => {
        if(err){
          console.log('Error: ' + err);
          return res.status(400).json({error: err.message});
        }

        const testTreasure = treasureList.find(treasure => treasure.id === treasureId);
        user.treasure.push(treasureList.find(treasure => treasure.id === treasureId));
        console.log(testTreasure);
        
        user.save();

        return res.status(200).json(user);
      });      
    } catch (err) {
      console.log('Error: ' + err);
      return res.status(400).json({error: err.message});
    }
  });

  app.get('/treasures', (req, res) => {
    return res.status(200).json(treasureList);
  })

  app.listen(config.PORT, () => {
    console.log(`starting ${config.ENV} server at http://localhost:${config.PORT}`);
  });
});