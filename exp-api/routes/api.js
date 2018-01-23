var express = require('express');
var router = express.Router();

var fs = require('fs');
var path = require('path');

var CODEPATH = path.resolve('code_base');

/*
  直接用fs来读写文件
 */

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/code/all', function(req, res, next) {
  var files = [];
  var dirPath = CODEPATH;
  fs.readdirSync(dirPath).forEach(function(file, index){
  	var info = fs.statSync(path.resolve(dirPath, file));
  	if(!info.isDirectory()){
  		files.push(path.basename(file,'.json'));
  	}
  });
  res.json({"data":files});
});
router.get('/code/detail/:code_name', function(req, res, next) {
  var fileName = req.params['code_name'] + '.json';
  var filePath = path.resolve(CODEPATH, fileName);
  var content;
  try{
  	content = JSON.parse(fs.readFileSync(filePath));
  }catch(err){
  	content = {"error": "error file"};
  }
  res.json(content);
});

router.post('/code/update', function(req, res, next) {
	var postData = req.body;
	if(!postData['files']){
		res.json({
			success: false,
			error: "无内容"
		});
		return;
	}
	try{
		fs.writeFileSync(path.resolve(CODEPATH, postData['name']+'.json'), JSON.stringify(postData));
	}catch(err){
		res.json({
			success: false,
			error: "写文件失败"
		});
		return;
	}
    res.json({
    	success: true
    });
});

router.post('/code/create', function(req, res, next) {
	var postData = req.body;
	
	if(!postData['files']){
		res.json({
			success: false,
			error: "无内容"
		});
		return;
	}
	try{
		fs.writeFileSync(path.resolve(CODEPATH, postData['name']+'.json'), JSON.stringify(postData));
	}catch(err){
		res.json({
			success: false,
			error: "写文件失败"
		});
		return;
	}
    res.json({
    	success: true
    });
});

module.exports = router;
