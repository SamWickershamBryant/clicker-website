var express = require("express");
var app = express();
var serv = require("http").Server(app);

const { Chess } = require("chess.js");
const chess = new Chess();

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/client/index.html");
    console.log("A request is made.");
});
app.use("/client", express.static(__dirname + "/client"));
serv.listen(3000);

var io = require("socket.io")(serv,{});
var clickers = 0;
var connections = [];
io.sockets.on("connection", function(socket) {
    console.log("socket Connection");

    socket.emit("clickerUpdate", {
        clickers:clickers
    });
    addConection();
    updateConnections();
   
    socket.on("click", function() {
        console.log("click!");
        clickers += 1;
        updateClickers();

       
        
    });

    socket.on("disconnect", function(reason) {
        console.log("disconnection..");
    });

    
    
   
});
function updateClickers() {
    io.sockets.emit("clickerUpdate", {
        clickers:clickers
    });

}
function updateConnections() {
    io.sockets.emit("connectionUpdate", {
        connections:connections
    });
}
function addConection() {
    connections.push("player " + Math.random());
}
