const db = require("../../db");

function queryNmae(keyWord=""){
  return new Promise((resolve, reject)=>{
    db.Project.find({"topic": {$regex: `.*${keyWord}.*`}}, (err, data)=>{
      if(err){
        reject(err);
      }else{
        resolve(data);
      }
    })
  });
}

function queryTag(keyWord=""){
  return new Promise((resolve, reject)=>{
    db.Project.find({"tag": {$regex: `.*${keyWord}.*`}}, (err, data)=>{
      if(err){
        reject(err);
      }else{
        resolve(data);
      }
    })
  });
}

module.exports = {
  queryNmae, queryTag
}