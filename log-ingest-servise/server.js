/*const express = require("express");
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
*/
/*



*/
const fs = require('fs');
const readline = require('readline');

async function readSocked() {
  const fileStream = fs.createReadStream('log_example.log');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

    var reg = /\w+|\((.*?)\)/g; // extract data
    var match;
    var res = [];

    var currentdate = new Date();
  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    console.log(`${line}`);
    while (match = reg.exec(line)) {
        res.push(match[1] || match[0]);
    }
    console.log(`${res}`);
    /*send to ES!
        send json:
        {
            service_name: match[1],
            date_time: currentdate
        }
     */
  }
}
readSocked();
