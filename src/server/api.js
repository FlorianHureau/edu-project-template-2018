const express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const uuid = require('node-uuid');
const fs = require('fs');
const config = require('./config.js');
const FindFiles = require('node-find-files');

router.use(bodyParser.json());

//add an episode
router.post('/', function (req, res) {
  var episode = req.body;
  episode.name = req.body.name;
  episode.code = req.body.code;
  episode.note = req.body.note;
  console.log(episode);
  episode.id = uuid.v4();
  fs.writeFile(config.data+'/'+episode.id+'.json', JSON.stringify(episode), function() {
		res.sendStatus(500);
	});
	res.status(201).send(JSON.stringify({id : episode.id}));
});

//Get an episode by is id
router.get('/:idEp', function(req, res){
  var idEp = req.params.idEp;
  var path = config.data + "/" + idEp + ".json";
  if(fs.existsSync(path)){
    return res.json(JSON.parse(fs.readFileSync(path, 'utf8')));
  }else {
			return res.sendStatus(404);
		}
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
			for(i; i < files.length ; i++)
			{
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
    console.log(req.data);
		return res.sendStatus(404);
	}
});

//Update
// router.put('/:idEp', function(req,res){
//   var idEp = req.params.idEp;
//   var path = config.data + "/" + idEp + ".json";
//   if(fs.existsSync(path)){
//     console.log('coucou');
//   }else {
// 			return res.sendStatus(404);
// 		}
// }
module.exports = router
