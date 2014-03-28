var hyperspace = require('hyperspace');
var through = require('through2');
var duplexer = require('duplexer2');
var fs = require('fs');

var bulk = require('bulk-require');
var files = bulk(__dirname + '/../render', [ '*.js' ]);
module.exports = Object.keys(files).reduce(function (acc, file) {
    acc[file] = function () { return wrap(file + '.html', files[file]) };
    return acc;
}, {});

function wrap (file, fn) {
    var input = through({ objectMode: true }), output = through();
    fs.readFile(__dirname + '/../render/' + file, function (err, html) {
        if (err) dup.emit('error', err);
        else input.pipe(hyperspace(html, fn())).pipe(output);
    });
    var dup = duplexer(input, output);
    return dup;
}
