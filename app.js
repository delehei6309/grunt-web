const Koa = require('koa');
const app = new Koa();
const path = require('path');
const fs = require('fs');
const route = require('koa-route');
const serve = require('koa-static');

const koaBody = require('koa-body');

const static = serve(path.join(__dirname));

app.use(koaBody());

const main = ctx => {
    ctx.response.type = 'html';
    ctx.response.body = fs.createReadStream('./src/html/react.html');
};

const api = ctx => {
    ctx.response.type = 'json';
    ctx.response.body = {'name':'chunting'};
};

const update = ctx => {
    ctx.response.type = 'json';
    let {name} = ctx.request.body;
    let data = {
        code,
        data:{
            name,
            lists:[
                {
                    age:88,
                    Gender: 'male'
                }
            ]
        },
        successful,
        msg
        
    };
    ctx.response.body = data;
};

app.use(static);
app.use(route.get('/index', main));
app.use(route.get('/api', api));
app.use(route.post('/update', update));

app.listen(3001);