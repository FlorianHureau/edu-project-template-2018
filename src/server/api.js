const express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const uuid = require('node-uuid');
const fs = require('fs');
const config = require('./config.js');
const FindFiles = require('node-find-files');
const dal = require('./dal');

router.use(bodyParser.json());

//add an episode
router.post('/', function (req, res) {
  const ep = req.body;
  ep.id = uuid.v4();
  dal.insert(ep).then((episode)=>{
      res.status(201);
      res.send(episode);
    }).catch((err)=>{
      res.sendStatus(400);
    });
});

//Get an episode by is id
router.get('/:idEp', function(req, res){
  const idEp = req.params.idEp;
  dal.findId(idEp).then((episode)=>{
      res.status(200);
      res.send(episode);
    }).catch((err)=>{
      res.sendStatus(404);
    });
});

//Get all episodes
router.get('/', function (request, response) {
    dal.findAll().then((episodes) => {
        response.status(200);
        response.send(episodes);
    }).catch((err) => {
        response.sendStatus(404);
    });
});

//Delete an episode by is id
router.delete('/:idEp', function(req, res) {
  const idEp = req.params.idEp;
  dal.remove(idEp).then(() => {
      res.sendStatus(204);
    }).catch((err)=>{
      res.sendStatus(404);
    });
});

//Update an episode
router.put('/:idEp', function(req, res){
  const newEp= req.body;
  newEp.id = req.params.idEp;
  const idEp = req.params.idEp;
  dal.update(idEp,newEp).then((episode) => {
    res.status(204);
    res.send(episode);
    }).catch((err)=>{
      res.sendStatus(400);
    });
});

module.exports = router
