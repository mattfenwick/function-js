'use strict';

var funcs = require('./functions.js'),
    partial = funcs.partial,
    compose = funcs.compose;
    
function f(x) {return x + 3;}
function g(y) {return y * 4;}
var h = partial(compose, f, g);

module.exports = {
    'h'      : h
};

