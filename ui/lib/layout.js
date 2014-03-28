var hyperstream = require('hyperstream');
var duplexer = require('duplexer2');
var through = require('through2');
var fs = require('fs');

module.exports = function () {
    var input = through();
    var hs = hyperstream({ '#content': input });
    readStream('layout.html').pipe(hs);
    return duplexer(input, hs);
};

function readStream (file) {
    return fs.createReadStream(__dirname + '/../static/' + file);
}
