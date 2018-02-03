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
      res.sendStatus(500);
    });
});

//Get an episode by is id
router.get('/:idEp', function(req, res){
  const idEp = req.params.idEp;
  dal.findId(idEp).then((episode)=>{
      res.status(201);
      res.send(episode);
    }).catch((err)=>{
      res.sendStatus(500);
    });
});

//Get all episodes
router.get('/', function(req, res){
  var finder = new FindFiles({
    rootFolder : config.data,
    filterFunction: (path) => {
      console.log(path);
      return true;
    }
  });
  var files = [];
  finder.on('match', function(strPath, stat) {
		files.push(strPath);
	});
  finder.on('complete', function() {
		if(files.length==0) {
			return res.sendStatus(204);
		}	else {
			var list = [];
			var i = 0;
			for(i; i < files.length ; i++) {
				var obj = JSON.parse(fs.readFileSync(files[i], 'utf8'));
				list.push(obj);
			}
			return res.json(list);
		}
	});
  finder.on('error', function(err) {
      console.log(err);
  });
  finder.startSearch();
});

//Delete an episode by is id
router.delete('/:idEp', function(req, res){
  const idEp = req.params.idEp;
  dal.remove(idEp).then(() => {
    console.log('deleted');
      res.status(201);
    }).catch((err)=>{
      res.sendStatus(500);
    });
});



//Update an episode
router.put('/:idEp', function(req, res){
  const newEp= req.body;
  newEp.id = req.params.idEp;
  const idEp = req.params.idEp;
  dal.update(idEp,newEp).then((episode) => {
    res.status(201);
    res.send(episode);
    }).catch((err)=>{
      res.sendStatus(500);
    });
});



module.exports = router
