'use strict';

var partial = require('./functions.js').partial,
    compose = require('./combinators.js').compose;

function f(x) {return x + 3;}
function g(y) {return y * 4;}
var h = partial(compose, f, g);

module.exports = {
    'h'      : h
};

