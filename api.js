
const {pool,router,Result,app}=require('./config/connect');

function api (){
	app.post('/adduser',(req,res)=>{
		var  addSql = "INSERT INTO `node_test`.`user` (`account`, `password`, `name`) VALUES ('"+req.body.account+"', '"+req.body.password+"', '"+req.body.name+"')";
		var data = JSON.parse(JSON.stringify(req.body)) 
		pool.getConnection((err,conn)=>{
			conn.query(addSql,(e,r)=>res.json(new Result({data:r})));
			conn.release();
		})
	});
	app.get('/user',(req,res)=>{
		pool.getConnection((err,conn)=>{
			conn.query('SELECT * FROM user',(e,r)=>res.json(new Result({data:r})));
			conn.release();
		})
	});
}

module.exports = api;