var path = require('path');
var fs = require('fs');
var mime = require('mime').types;

var files = {
    'css/font-awesome.css': 'font-awesome/css/font-awesome.min.css',
    'fonts/fontawesome-webfont.eot': 'font-awesome/fonts/fontawesome-webfont.eot',
    'fonts/fontawesome-webfont.ttf': 'font-awesome/fonts/fontawesome-webfont.ttf',
    'fonts/fontawesome-webfont.woff': 'font-awesome/fonts/fontawesome-webfont.woff',
    'fonts/fontawesome-webfont.svg': 'font-awesome/fonts/fontawesome-webfont.svg'
};
Object.keys(files).forEach(function (key) {
    files[key] = require.resolve(files[key]);
});

module.exports = function (req, res) {
    var p = req.url.split('?')[0];
    var file = p.split('/').slice(2).join('/');
    if (!files.hasOwnProperty(file)) {
        res.statusCode = 404;
        res.end('not found');
    }
    else {
        var type = mime[path.extname(p).slice(1)] || 'text/plain';
        res.setHeader('content-type', type);
        fs.createReadStream(files[file]).pipe(res);
    }
};
