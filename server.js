var http = require('spdy');
var fs = require('fs');


var config = {
    key: fs.readFileSync("./certs/ca.key"),
    cert: fs.readFileSync("./certs/ca.crt")
};

var server = http.createServer(config, function (request, response) {
    response.writeHead(200, "OK");
    response.write("Hello from HTTP/2");
    response.end();
});

console.log("Server listening on port 8443");
server.listen(8443);


