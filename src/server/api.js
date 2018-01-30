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
  console.log(req.body);
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
router.delete('/:idEp', function(req,res){
  var idEp = req.params.idEp;
  var path = config.data + "/" + idEp + ".json";
  if(fs.existsSync(path)){
    fs.unlinkSync(path);
		return res.sendStatus(204);
  }else {
		return res.sendStatus(404);
	}
});

//Update an episode
router.put('/:idEp', function(req,res){
  var idEp = req.params.idEp;
  var path = config.data + "/" + idEp + ".json";
  var episode = req.body;
  episode.name = req.body.name;
  episode.code = req.body.code;
  episode.note = req.body.note;
  episode.id = idEp;
  if(fs.existsSync(path)){
    fs.writeFile(path, JSON.stringify(episode), function() {
    res.sendStatus(200);
    });
  }else {
			return res.sendStatus(404);
	}
});

module.exports = router
