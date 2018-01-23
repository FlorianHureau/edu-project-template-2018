const express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const uuid = require('node-uuid');
const fs = require('fs');
const config = require('./config.js');
const FindFiles = require('node-find-files');

router.use(bodyParser.json());
// router.get('/', function (req, res) {
//     res.send('Coucou');
// })

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
})

router.get('/', function(req, res){
  console.log("coucou");
  console.log(config.data);
  var finder = new FindFiles({
    rootFolder : config.data,
    filterFunction: (path) => {
      console.log(path);
      return true;
    }
  });
  var files = [];
  finder.on('match', function(strPath, stat) {
    console.log(strPath);
		files.push(strPath);
	});
  finder.on('complete', function() {
		if(files.length==0) {
			return res.sendStatus(204);
		}
    console.log(files);
	});
  finder.on('error', function(err) {
      console.log(err);
  });
  finder.startSearch();

})
module.exports = router
