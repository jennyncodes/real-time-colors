var express = require("express");
var fs = require("fs");
var port = 8000;
var bodyparser = require("body-parser");
var app = express();
var color= "";


app.set("view engine", "ejs");
// This allows the server to read the ejs files
// in views folder
app.set("views", __dirname + "/views" );
// This makes it easier to pull information
// from the ejs files saved in views
app.use(express.static(__dirname + "/static"));
// Allows us to use the static files
app.use(bodyparser.urlencoded({extended: true}));
// Allows us to use POST requests

//port
var server=app.listen(port, function(){
    console.log(`Listening on port ${port}...`)
});


var io = require('socket.io').listen(server)
	// Root route to render the index.ejs view
	app.get('/', function(req, res) {
		res.render("index"); 
	})
	// Listen to connection even from the client side
	io.sockets.on('connection', function (socket){
        console.log("Client/socket is connected!");
        console.log("Client/socket id is :", socket.id);
        socket.emit("launch", { bgc: color});
        socket.broadcast.emit("launch", {bgc:color});

        socket.on("green_push", function(){
            socket.emit("green_bg");
            socket.broadcast.emit("green_bg");
            color = "green"
        });
        socket.on("blue_push", function(){
            socket.emit("blue_bg");
            socket.broadcast.emit("blue_bg");
            color = "blue"
        });
        socket.on("pink_push", function(){
            socket.emit("pink_bg");
            socket.broadcast.emit("pink_bg");
            color = "pink"
        });
    });



    

