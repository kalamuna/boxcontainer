var request = require('request');
var parse = require('JSONStream').parse;
var through = require('through2');

module.exports = VM;

function VM (base) {
    if (!(this instanceof VM)) return new VM(base);
    this.base = base || 'http://localhost:4243';
}

VM.prototype.list = function () {
    return this._get('/images/json').pipe(lowerKeyStream());
};

VM.prototype._get = function (href) {
    return request(this.base + href).pipe(parse([ true ]));
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
