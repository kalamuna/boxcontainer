var path = require('path');
var fs = require('fs');
var mime = require('mime').types;

var files = {
    'font-awesome.css': require.resolve('font-awesome/css/font-awesome.min.css')
};

module.exports = function (req, res) {
    var p = req.url.split('?')[0];
    var file = p.split('/').slice(2).join('/');
    if (!files.hasOwnProperty(file)) {
        res.statusCode = 404;
        res.end('not found');
    }
    else {
        var type = mime[path.extname(p)] || 'text/plain';
        res.setHeader('content-type', type);
        fs.createReadStream(files[file]).pipe(res);
    }
};
