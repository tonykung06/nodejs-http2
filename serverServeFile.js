var http = require('spdy');
var fs = require('fs');
var path = require('path');
var url = require('url');


var getContentType = function(extention) {
    switch (extention) {
        case '.html':
            return "text/html";
        case '.js':
            return "application/javascript";
        case '.png':
            return "image/png";
    }
};

var config = {
    key: fs.readFileSync("./certs/ca.key"),
    cert: fs.readFileSync("./certs/ca.crt")
};

var server = http.createServer(config, function (request, response) {
    var urlParts = url.parse(request.url);
    var doc = './docs' + urlParts.pathname;
    fs.exists(doc, function fileExists(exists) {
        if (exists) {
            response.writeHead(200, { 'Content-Type': getContentType(path.extname(doc))});
            fs.createReadStream(doc).pipe(response);
        } else {
            response.writeHead(404);
            response.end('Not found\n');
        }
    });
});

console.log("Server listening on port 8443");
server.listen(8443);


