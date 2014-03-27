#!/usr/bin/env node

var http = require('http');
var ecstatic = require('ecstatic');
var minimist = require('minimist');

var runBrowser = require('./lib/run_browser.js');

var argv = minimist(process.argv.slice(2), {
    alias: { p: 'port' },
    default: { port: 0 }
});

var est = ecstatic(__dirname + '/static');
var server = http.createServer(function (req, res) {
    est(req, res);
});

server.listen(argv.port, function () {
    var href = 'http://localhost:' + server.address().port;
    if (argv.u) console.log(href)
    else runBrowser(href, error)
});

function error (err) {
    if (!err) return;
    console.error(err.message || err);
    process.exit(1)
}
