var http = require('spdy');
var fs = require('fs');
var path = require('path');
var url = require('url');


var getContentType = function (extention) {
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
    var headers = {'content-type': 'application/javascript'};
    response.push('/script.js', headers, function (err, stream) {
        stream.on('error', function (error) {
            console.dir(error)
        });
        var script = fs.readFileSync('./docs/script.js');
        stream.end(script);
    });
    response.end('<html><head><script type="text/javascript" src="/script.js"></script><body><script>message("test");</script></body></html>');
});

console.log("Server listening on port 8443");
server.listen(8443);


