#!/usr/bin/env node

var http = require('http');
var ecstatic = require('ecstatic');
var minimist = require('minimist');
var url = require('url');
var path = require('path');

var runBrowser = require('./lib/run_browser.js');
var layout = require('./lib/layout.js');
var render = require('./lib/render.js');
var vendor = require('./lib/vendor.js');

var argv = minimist(process.argv.slice(2), {
    alias: { p: 'port' },
    default: { port: 0 }
});
var vm = require('./lib/vm')(argv.vm);

var est = ecstatic(__dirname + '/static');
var server = http.createServer(function (req, res) {
    var u = url.parse(req.url), p = u.pathname;
    if (p === '/' || p === '/sites') {
        res.setHeader('content-type', 'text/html');
        vm.containers.list()
            .pipe(render.site())
            .pipe(layout())
            .pipe(res)
        ;
    }
    else if (p === '/images') {
        res.setHeader('content-type', 'text/html');
        vm.images.list()
            .pipe(render.image())
            .pipe(layout())
            .pipe(res)
        ;
    }
    else if (p.split('/')[1] === 'vendor') {
        vendor(req, res);
    }
    else est(req, res);
});

server.listen(argv.port, function () {
    var href = 'http://localhost:' + server.address().port;
    if (argv.u) console.log(href)
    else runBrowser(href, argv, error)
});

function error (err) {
    if (!err) return;
    console.error(err.message || err);
    process.exit(1)
}
