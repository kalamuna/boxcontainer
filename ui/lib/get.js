var request = require('request');
var base = 'http://localhost:4243';
var parse = require('JSONStream').parse;

module.exports = function (href) {
    return request(base + href).pipe(parse([ true ]));
};
