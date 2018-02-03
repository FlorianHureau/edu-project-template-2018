const fs = require('fs');
const config = require('./config.js');
const path = require('path');
const FindFiles = require('node-find-files');

exports.insert = function(episode) {
  return new Promise((resolve, reject)=> {
    const path = `${config.data}/${episode.id}.json`;
    fs.writeFile(path, JSON.stringify(episode), function(err){
      if(err){
        reject(err);
        return;
      }
      resolve(episode);
    });
  })
};

exports.findId = function(idEp) {
  return new Promise((resolve, reject)=> {
    const path = `${config.data}/${idEp}.json`;
    fs.readFile(path, 'utf8',function(err, data){
      if(err){
        reject(err);
        return;
      }
      resolve(JSON.parse(data));
		})
  })
};

exports.remove = function(idEp) {
  return new Promise((resolve, reject)=> {
    const path = `${config.data}/${idEp}.json`;
    fs.unlinkSync(path,function(err, data){
      if(err){
        reject(err);
        return;
      }
      resolve();
		})
  })
};

exports.update = function(idEp, episode) {
  return new Promise((resolve, reject)=> {
    const path = `${config.data}/${episode.id}.json`;
    fs.writeFile(path, JSON.stringify(episode), function(err){
      if(err){
        reject(err);
        return;
      }
      resolve(episode);
    });
  })
};


// exports.findAll = function() {
//   return new Promise((resolve, reject)=> {
//     const path = `${config.data}/${idEp}.json`;
//
//     var finder = new FindFiles({
//       rootFolder : config.data,
//       filterFunction: (path) => {
//         console.log(path);
//         return true;
//       }
//     });
//
//     fs.readFile(path, 'utf8',function(err, data){
//       if(err){
//         reject(err);
//         return;
//       }
//       resolve(JSON.parse(data));
// 		})
//   })
// };
