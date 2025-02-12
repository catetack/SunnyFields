const express = require('express'); //requir is similare to include from c/c++
const app = express();
const http = require('http');
const server = http.createServer(app);

const LISTEN_PORT = 8080;
const ABS_STATIC_PATH = __dirname + '/public';

//set routes
app.get('/', function(req,res){//(request, response)    
    res.sendFile('index.html', {root:ABS_STATIC_PATH});     //requires an absolute path
});

server.listen(LISTEN_PORT);
app.use(express.static(ABS_STATIC_PATH));   //client has file access
console.log("listening on port" + LISTEN_PORT);