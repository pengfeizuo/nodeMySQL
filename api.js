
const {pool,router,Result,app}=require('./config/connect');

function api (){
	app.post('/login',(req,res)=>{
		var selectSQL = "select account,password from user where account = '"+req.query.account+"' and password = '"+req.query.password+"'";
		pool.getConnection((err,conn)=>{
			conn.query(selectSQL,(e,r)=>res.json(
				new Result({data:r})
				));
			conn.release();
		})
	});
	app.post('/adduser',(req,res)=>{
		var  addSql = "INSERT INTO `node_test`.`user` (`account`, `password`) VALUES ('"+req.body.account+"', '"+req.body.password+"')";
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