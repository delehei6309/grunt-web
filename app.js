const Koa = require('koa');
const app = new Koa();
const path = require('path');
const fs = require('fs');
const route = require('koa-route');
const serve = require('koa-static');
const {dataItems} = require('./dataBase/UserData.json');
const koaBody = require('koa-body');
//console.log(dataItems)
const static = serve(path.join(__dirname));

app.use(koaBody());

const main = ctx => {
    ctx.response.type = 'html';
    ctx.response.body = fs.createReadStream('./src/html/react.html');
};

const api = ctx => {
    ctx.response.type = 'json';
    ctx.response.body = {'name':'卡卡'};
};

const login = ctx => {
    ctx.response.type = 'json';
    //console.log(ctx.request.body);
    let {userName,password} = ctx.request.body;
    let code = 500;
    let msg = '系统异常';
    let successful = false;
    let data = null;
    if(userName && password){
        if(!dataItems[userName]){
            code = 33901;
            msg = '用户不存在';
        }else if(dataItems[userName] != password){
            code = 33902;
            msg = '密码不正确';
        }else{
            code = 200;
            msg = '成功';
            data = {
                userName,
                lists:[
                    {
                        age:88,
                        Gender: 'male'
                    }
                ]
            };
        }
        
    }else{
        code = -1;
        msg = '入参参数错误';
    }
    let dataOut = {
        code,
        data,
        successful,
        msg
        
    };
    ctx.response.body = dataOut;
};

app.use(static);
app.use(route.get('/index', main));
app.use(route.get('/api', api));
app.use(route.post('/login', login));

app.listen(3001);