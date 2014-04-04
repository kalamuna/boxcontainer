var request = require('request');
var parse = require('JSONStream').parse;
var through = require('through2');

module.exports = function (base) {
    if (!base) base = 'http://localhost:4342';
    return {
        images: new Images(base),
        containers: new Containers(base)
    };
};

function Images (base) {
    if (!(this instanceof Images)) return new Images(base);
    this.base = base;
}

Images.prototype.list = function () {
    return get(this.base, '/images/json').pipe(lowerKeyStream());
};

Images.prototype.get = function (id, cb) {
    request(this.base + '/images/' + id + '/json', { json: true }, cb);
};

function Containers (base) {
    if (!(this instanceof Containers)) return new Containers(base);
    this.base = base;
}

Containers.prototype.list = function () {
    return get(this.base, '/containers/json').pipe(lowerKeyStream());
};

function lowerCaseKeys (obj) {
    if (!obj || typeof obj !== 'object') return obj;
    var copy = {};
    var keys = Object.keys(obj);
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        copy[lcfirst(key)] = obj[key];
    }
    return copy;
}

function lowerKeyStream () {
    return through({ objectMode: true }, function (row, enc, next) {
        this.push(lowerCaseKeys(row));
        next();
    });
}

function lcfirst (s) {
    return s.charAt(0).toLowerCase() + s.slice(1);
}

function get (base, href) {
    return request(base + href).pipe(parse([ true ]));
}
