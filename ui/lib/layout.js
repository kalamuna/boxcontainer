var hyperstream = require('hyperstream');
var duplexer = require('duplexer2');
var through = require('through2');

module.exports = function () {
    var input = through();
    return duplexer(input, hyperstream({ '#content': input }));
};
