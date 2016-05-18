/**
 * Created by chenzhengguo on 2015/7/30.
 * Updated by chenzhengguo on 2016/1/28.
 */
var path = require('path');
var fs = require('fs');
var mock = require("mockjs");
var app = require('express')();
var port = process.argv.slice(2)[0] || 8080;
var server = app.listen(port, function() {
  console.info('Mock server is listening at' + port);
});

const prefix = '/api';

var api = {};
var apiPath = path.join(__dirname, './api.json');
function getApis() {
  fs.readFile(apiPath, 'utf-8', function(err, content) {
    api = JSON.parse(content);
  });
}
//监听api.json变化
fs.watchFile(apiPath, function(curr) {
  console.log('API is updated.', curr.mtime);
  getApis();
});
getApis();

//支持callback
app.set('jsonp callback name', 'callback');
app.use(function(req, res) {
  var data = undefined;
  var delay = 0;
  for(var group in api) {
    if(api[group].find(function(reqData) {
      if(req.originalUrl.indexOf(prefix + reqData.url) !== 0) {
        return false;
      }
      var apiRes = reqData.res;
      data = reqData.mock ? mock.mock(apiRes) : apiRes;
      delay = reqData.delay || 0;
      return true;
    }) !== undefined) {
      break;
    }
  }
  data !== undefined ? setTimeout(() => res.jsonp(data), delay) : res.sendStatus(404);
});