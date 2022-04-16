//dependence
var http = require('http');
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;

//
var server = http.createServer(function (req, res) {
    //get url and parse
    var parseUrl = url.parse(req.url, true);
    //
    // //get the path
    var path = parseUrl.pathname;
    var strimPath = path.replace(/^\/+|\/+$/g, '');
    //method
    var method = req.method.toLowerCase();

    var queryStringObject = parseUrl.query;

    var decoder = new StringDecoder('utf-8');
    var buffer = '';
    req.on('data', function (data) {
        buffer += decoder.write(data);
    });
    req.on('end', function (end) {
        buffer += decoder.end();

        var chosenHandler = (typeof (router[strimPath]) !== undefined) ? handlers.sample : handlers.notFound;

        var data=
        {
            "strimPath"
        :
            strimPath
        }
        ;

        chosenHandler(data, function (statusCode, payload) {
            statusCode = typeof (statusCode) == "number" ? statusCode : 200;
            payload = typeof (payload) == "object" ? payload : {};
            var payLoadString = JSON.stringify(payload);
            res.end('hello');
            res.writeHead(statusCode)
            //log the request
            console.log("Buffer  " + buffer);
        });

    });

})
//server start
server.listen(3000, function () {
    console.log("dang chay r nhe");
})


//definer the handler
var handlers = {};
//sample handlers
handlers.sample = function (data, callback) {
// call back
    callback(406, {'name': 'sample handle'})
};
// //not found sample
handlers.notFound = function (data, callback) {
    callback(404);
};

//definer the request router
var router = {
    'sample': handlers.sample
}
