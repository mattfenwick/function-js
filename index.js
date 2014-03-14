var modules = ['arrays', 'egs', 'equality', 'functions', 
               'objects', 'operators', 'types'];

var obj = {};
modules.map(function(n) {
    obj[n] = require('./lib/' + n + '.js');
});

module.exports = obj;

