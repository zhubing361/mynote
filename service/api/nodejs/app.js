import Express from 'express';
const app = Express();
app.use(Express.json());

import mongo from './mongo.js';
app.all("*",function(req,res,next){
//设置允许跨域的域名，*代表允许任意域名跨域
res.header("Access-Control-Allow-Origin","*");
//允许的header类型
res.header("Access-Control-Allow-Headers","content-type");
//跨域允许的请求方式
res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
if (req.method.toLowerCase() == 'options')
    res.send(200);  //让options尝试请求快速结束
else
    next();
});
app.get('/notes', async (req,res)=>{
    const page = req.query.page || 1;
    const page_size = req.query.page_size || 10;
    const keyword = req.query.keyword || '';
    let where = {};
    if(keyword.length > 0) {
        where = {keyword: keyword};
    }
    const data = await mongo.paginate(where, page_size, page);
    res.send(success('success', data));
});
app.get('/notes/:id', async (req,res)=>{
    const data = await mongo.findOne(parseInt(req.params.id));
    res.send(success('success', data));
});
app.post('/notes', async (req,res)=>{
    const temp = {
        title: req.body.title,
        content: req.body.content
    };
    const result = await mongo.createOne(temp);
    res.send(result ? success('success', {}) : fail());
});
app.put('/notes/:id', async (req,res)=>{
    const temp = {
        title: req.body.title,
        content: req.body.content
    };
    const result = await mongo.updateOne(parseInt(req.params.id), temp);
    res.send(result ? success('success', {}) : fail());
});
app.delete("/notes/:id", async (req,res)=>{
    const result = await mongo.deleteOne(parseInt(req.params.id));
    res.send(result ? success('success', {}) : fail());
});

const success = (result, data) => {
    return {
        code: 1,
        message: 'success',
        result: result || 'success',
        data: data || {}
    }
}
const fail = (result) => {
    return {
        code: 0,
        message: 'error',
        result: result || 'error',
        data: {}
    }
}

const port = process.env.PORT || 5003;
app.listen(port,()=>{console.log(`App running at: http://127.0.0.1:${port}`)});