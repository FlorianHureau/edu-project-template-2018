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
    fs.unlink(path,function(err) {
      if(err){
        reject(err);
        return;
      }
      resolve(idEp);
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

exports.findAll = function() {
    return new Promise((resolve, reject) => {
        const path = `${config.data}`;
        fs.readdir(path, function (err,  files) {
            if (err) {
                reject(err);
                return;
            }
            const promises = [];
            files.forEach(function (file) {
                promises.push(readFile(path+"/"+file));
            });
            Promise.all(promises).then((episodes) => {
                resolve(episodes);
            });
        });
    });
};

function readFile(file) {
    return new Promise((resolve, reject) => {
        fs.readFile(file, 'utf8', function (err, episode) {
            if(err){
                reject(err);
                return;
            }
            resolve(JSON.parse(episode));
        });
    });
}
