
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const router = express.Router();
const option = {    
  host     : 'localhost',      
  user     : 'mrz',             
  password : '123456',      
  port: '3306',                  
  database: 'node_test',
  connectTimeout:5000,
  multipleStatements:false
}

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))

let pool;
repool();

function Result({code=1,msg='',data={}}){
	this.code=code;
	this.msg=msg;
	this.data=data;
}

function repool(){
	pool = mysql.createPool({
		...option,
		waitForConnections:true,
		connectionLimit:100,
		queueLimit:0
	});
	pool.on('error',err=>err.code === 'PROTOCOL_CONNECTION_LOST' && setTimeout(repool,2000))
}

module.exports = {pool,Result,router,app}
