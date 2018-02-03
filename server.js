var express = require('express');

var app = express();
var port = process.env.PORT || '3000';

app.use(express.static(__dirname + '/dist'));

app.all('*', (req, res)=>{
	res.status(200).sendFile(__dirname + '/dist/index.html');
});

app.listen(port);