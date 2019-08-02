const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const mongodb =  require('mongodb')
const MongoClient = mongodb.MongoClient;


const config = require('../../config/mongodb')
// Connection URL
const url = 'mongodb://' + config.username + ':' + config.password + '@' + config.server + ':27017';

// Gets All heroes
router.get('/', (req, res) => {

    for (var key in req.body) {
      if(req.body[key] === '' ) {
          req.body[key] = null;
          }
    }
    
    MongoClient.connect(url, function (err, client) {
      if (err) throw err
    
      var db = client.db('heroes')
    
      db.collection('heroes').find().toArray(function (err, result) {
        if (err) throw err
        res.send(result);
        client.close();
      })
    })

})

// Get Single heroe
router.get('/:id', (req, res) => {
  
  MongoClient.connect(url, function (err, client) {
    if (err) throw err
  
    var db = client.db('heroes');
    var o_id = new mongodb.ObjectID(req.params.id);
    console.log(o_id);
    db.collection('heroes').find({ '_id': o_id}).toArray(function (err, result) {
      if (err) throw err 
      res.send(result[0]);
      client.close(); 
    })
  })

});

// Create heroe
router.post('/', (req, res) => {
  const newheroe = {
    name: req.body.name
  };

  if (!newheroe.name) {
    return res.status(400).json({ msg: 'Please include a name and email' });
  }

  MongoClient.connect(url, function (err, client) {
    if (err) throw err
  
    var db = client.db('heroes')
  
    db.collection('heroes').find().toArray(function (err, result) {
      if (err) 
        throw err

        const collection = db.collection('heroes');

        collection.insertMany([{name : req.body.name}], function(err, result) {
          
          //callback(result);
        });

        client.close();
    })
  })
});

// Update heroe
router.put('/:id', (req, res) => {  
  const updheroe = req.body;

  const pool = new sql.ConnectionPool(config, err => {
    // ... error checks
    pool.on('error', err => {
        console.log('ConnectionPool', err);
    })
 
    var updateheroetvp = new sql.Table('heroType');
    updateheroetvp.columns.add('id', sql.Int, {nullable: true, primary: true});
    updateheroetvp.columns.add('name', sql.NVarChar(150), {nullable: false, primary: false});    
    updateheroetvp.rows.add(req.params.id,
                            updheroe.name
                            );
  
    pool.request() //
    .input('herotype', updateheroetvp)
    .execute('dbo.heroes_up', (err, result) => {
      if(err){
        res.status(500).json({ error: err })       
      } else {
        res.status(200).json({ 
          msg: 'heroe updated', updheroe 
         })       
      }    
    })
  })
});

// Delete heroe
router.delete('/:id', (req, res) => {
  const pool = new sql.ConnectionPool(config, err => {
    // ... error checks
    pool.on('error', err => {
        console.log('ConnectionPool', err);
    })
 
    pool.request() //
    .input('id', req.params.id)
    .execute('dbo.heroes_dp', (err, result) => {
        if(err){
          res.status(500).json({ error: err })       
        } else {
          res.status(200).json({ 
            msg: 'heroe deleted'
           })       
        }
        
    })
  })
  
});

module.exports = router;