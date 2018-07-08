var express = require('express');
var router = express.Router();
var fs = require('fs');
var PATH = './public/data/';
var moment = require('moment');

//读取数据模块，供客户端调用
//查询接口，token校验
//公共接口，无需校验
//data/read?type=it
//data/read?type=it.json
//暂时只做 cat   dog 读取接口
router.get('/read', function(req, res, next) {
  var type = req.param('type') || '';
  fs.readFile(PATH + type + '.json', function(err, data){
    if(err){
      return res.send({
        status:0,
        info:'读取文件出现异常'
      });
    }
    var COUNT = 50;
    //TODO: try
    var obj = [];
    try{
      obj = JSON.parse(data.toString());
    }catch(e){
      obj = [];
    }
    if(obj.length > COUNT){
      obj = obj.slice(0, COUNT);
    }
    return res.send({
      status:1,
      data:obj
    });
  });
});

//数据存储模块 后台开发使用
//暂时只做 cat   dog 存储接口
router.get('/write', function(req, res, next){
  if(!req.session.user){
    return res.send({
      status: 0,
      info: '未鉴权认证'
    });
  }
  //文件名
  var type = req.query.type || '';
  //关键字段
    if(type=="listContent"){//首页listContent数据存储
        var title=req.query.title || '';
        var imagesUrl=req.query.imagesUrl || '';
        var content=req.query.content || '';
        if(!type || !title || !imagesUrl || !content){
            return res.send({
                status:0,
                info:'提交的字段不全'
            });
        }
    }else if(type=="dog"||type=="cat"||type=="petsProduct"){
        var name=req.query.name || '';
        var imgUrl=req.query.imgUrl || '';
        var price=req.query.price || '';
        var direction=req.query.direction || '';
        var videoUrl=req.query.videoUrl || '';
        if(type=="petsProduct") {
            if(!type || !name || !price || !imgUrl){
                return res.send({
                    status:0,
                    info:'提交的字段不全'
                });
            }
        }else if(!type || !name || !price || !direction || !videoUrl || !imgUrl){
            return res.send({
                status:0,
                info:'提交的字段不全'
            });
        }
    }
    console.log(type);
    console.log(title);
    console.log(imagesUrl);
    console.log(content);


  //1)读取文件
  var filePath = PATH + type + '.json';
  console.log(1);
  console.log(filePath);
  fs.readFile(filePath, function(err, data){
    if(err){
      return res.send({
        status:0,
        info: '读取数据失败'
      });
    }
    var arr = JSON.parse(data.toString());
    //代表每一条记录
    if(type=="listContent"){
        var obj = {
            title: title,
            imagesUrl: imagesUrl,
            content:content,
            flag: guidGenerate(),
            time: moment().format('L'),
            switcher:'off'
        };
    }else if(type=="dog"||type=="cat"||type=="petsProduct"){
        var obj = {
            name: name,
            img: imgUrl,
            price:price,
            petsDirection:type=='petsProduct'?"":direction,
            video:type=='petsProduct'?"":videoUrl,
            flag: guidGenerate(),
            time: moment().format('L')
        };
    }

    arr.splice(0, 0, obj);
    //2)写入文件
    var newData = JSON.stringify(arr);
    fs.writeFile(filePath, newData, function(err){
      if(err){
        return res.send({
          status:0,
          info: '写入文件失败'
        });
      }
      return res.send({
        status:1,
        info: obj
      });
    });
  });
});
//数据删除模块
router.get('/delete', function(req, res, next){
    if(!req.session.user){
        return res.send({
            status: 0,
            info: '未鉴权认证'
        });
    }
    //flag
    var flag = req.query.flag || '';
    var type = req.query.type || '';
    //关键字段
    console.log(flag);
    if(!flag){
        return res.send({
            status:0,
            info:'提交的字段不全'
        });
    }

    //1)读取文件
    var filePath = PATH + type + '.json';
    console.log(1);
    console.log(filePath);
    fs.readFile(filePath, function(err, data){
        if(err){
            return res.send({
                status:0,
                info: '读取数据失败'
            });
        }
        var arr = JSON.parse(data.toString());
        var newArr=[];
        //代表每一条记录
        arr.forEach((item,index)=>{
          console.log(item.flag);
          if(item.flag != flag){
            newArr.push(item);
          }
        });
        console.log(newArr);
        //2)写入文件
        var newData = JSON.stringify(newArr);
        fs.writeFile(filePath, newData, function(err){
            if(err){
                return res.send({
                    status:0,
                    info: '写入文件失败'
                });
            }
            return res.send({
                status:1,
                info: '写入文件成功'
            });
        });
    });
});

//修改数据模块
router.get('/change', function(req, res, next){
    if(!req.session.user){
        return res.send({
            status: 0,
            info: '未鉴权认证'
        });
    }
    //flag
    var flag = req.query.flag || '';
    var type = req.query.type || '';
    //关键字段
    console.log(flag);
    if(!flag){
        return res.send({
            status:0,
            info:'提交的字段不全'
        });
    }

    //1)读取文件
    var filePath = PATH + type + '.json';
    console.log(1);
    console.log(filePath);
    fs.readFile(filePath, function(err, data){
        if(err){
            return res.send({
                status:0,
                info: '读取数据失败'
            });
        }
        var arr = JSON.parse(data.toString());
        var newArr=[];
        //代表每一条记录
        arr.forEach((item,index)=>{
            console.log(item.flag);
            if(item.flag != flag){
                newArr.push(item);
            }
        });
        console.log(newArr);
        //2)写入文件
        var newData = JSON.stringify(newArr);
        fs.writeFile(filePath, newData, function(err){
            if(err){
                return res.send({
                    status:0,
                    info: '写入文件失败'
                });
            }
            return res.send({
                status:1,
                info: '写入文件成功'
            });
        });
    });
});
//阅读模块写入接口 后台开发使用
// router.post('/write_config', function(req, res, next){
//   if(!req.session.user){
//     return res.send({
//       status: 0,
//       info: '未鉴权认证'
//     });
//   }
//   //TODO:后期进行提交数据的验证
//   //防xss攻击 xss
//   // npm install xss
//   // require('xss')
//   // var str = xss(name);
//   var data = req.body.data;
//   //TODO ： try catch
//   var obj = JSON.parse(data);
//   var newData = JSON.stringify(obj);
//   //写入
//   fs.writeFile(PATH + 'config.json', newData, function(err){
//     if(err){
//       return res.send({
//         status: 0,
//         info: '写入数据失败'
//       });
//     }
//     return res.send({
//       status: 1,
//       info: obj
//     });
//   });
// });

//登录接口
router.post('/login', function(req, res, next){
  //用户名、密码、验证码
  var username = req.body.username;
  var password = req.body.password;

  //TODO ：对用户名、密码进行校验
  //xss处理、判空

  //密码加密 md5(md5(password + '随机字符串'))
  //密码需要加密－> 可以写入JSON文件
  if(username === 'admin' && password === '123456'){
    req.session.user = {
      username: username
    };
    return res.send({
      status: 1
    });
  }

  return res.send({
    status: 0,
    info: '登录失败'
  });
});

//guid
function guidGenerate() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0,
      v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  }).toUpperCase();
}

module.exports = router;
