var express = require('express');
var router = express.Router();
var fs = require('fs');
var PATH = './public/data/';

router.get('/', function(req, res, next) {
  if(!req.session.user){
    return res.render('login', {});
  }
  res.render('index', {});
});

router.get('/login', function(req, res, next) {
  res.render('login', {});
});

router.get('/editListContent', function(req, res, next) {
  if(!req.session.user){
    return res.render('login', {});
  }
    var type = req.query.type;
    console.log(type);
    if(type){
        var obj = {};
        switch (type){
            case 'listContent':
                obj = {};
                break;
            default :
                return res.send({
                    status:0,
                    info: '参数错误'
                });
                break;
        }
        fs.readFile(PATH + type + '.json', (err, data) => {
            if (err) {
                return res.send({
                    status:0,
                    info: 'fail.....'
                });
            }
            var obj = JSON.parse(data.toString());
            return res.render('editListContent', {
                data: obj
            });
        });

    }else{
        return res.send({
            status:0,
            info: '参数错误'
        });
    }
  // res.render('editListContent', {});
});

router.get('/edit', function(req, res, next) {
  if(!req.session.user){
    return res.render('login', {});
  }
  var type = req.query.type;
  if(type){
    var obj = {};
    switch (type){
      case 'cat':
        obj = {};
        break;
      case 'dog':
        obj = {};
        break;
      case 'petsProduct':
        obj = {};
        break;
      case 'cookies':
        obj = {};
        break;
      default :
        return res.send({
          status:0,
          info: '参数错误'
        });
        break;
    }
    fs.readFile(PATH + type + '.json', (err, data) => {
      if (err) {
        return res.send({
          status:0,
          info: 'fail.....'
        });
      }
      var obj = JSON.parse(data.toString());
      return res.render('edit', {
        data: obj
      });
    });

  }else{
    return res.send({
      status:0,
      info: '参数错误'
    });
  }
});

//首页大表单

module.exports = router;