const express = require("express");
const app = express ();

var http = require("http").createServer(app);
var ws = require("ws")

var webSocket = new WS.Server({server: http, path:'/ws/'})
webSocket('connection', (socket) => {
    socket.on("close", () => {
        console.log("Connection close")
    })

    socket.on("message", () => {
        // send the log to log-processing-service
        console.log("message recieve")
    })
})

