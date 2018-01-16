const express = require('express');
var router = express.Router()

router.get('/', function (req, res) {
    res.send('Coucou');
})
router.post('/',function(req,res){
    var episode = req.body;
    console.log(episode);
    episode.name = req.body.name;
    episode.code = req.body.code;
    episode.note = req.body.note;
})

module.exports = router;