/*
 - member access -- getting and setting
 - object creation
 - class, prototype, etc. creation
 - methods -- function wrappers around things like f.apply(...)
 - constructor creation
 - constructor invocation
 - `this`
 - exceptions
 - control structures
*/
var modules = ['arrays', 'egs', 'equality', 'functions', 
               'objects', 'operators', 'types'];

var obj = {};
modules.map(function(n) {
    obj[n] = require('./lib/' + n + '.js');
});

module.exports = obj;

