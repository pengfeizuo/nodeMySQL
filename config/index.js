const {app,pool,Result}=require('./connect')
const api = require('../api')
app.all('*',(req,res,next)=>{
	next();
})

app.all('/',(req,res,next)=>{
	pool.getConnection((err,conn)=>{
		conn.query('SELECT * FROM user',(e,r)=>res.json(new Result({data:r})));
		conn.release();
	})
})
api()
app.listen(8080,()=>console.log('服务启动'));


