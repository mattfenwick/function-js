'use strict';

var objects = require('./objects.js');


function type(val) {
    // does an end-around on primitives by converting them to objects
    // tries to find subtype for objects
    if ( val === undefined ) {
        return {'type': 'undefined', 'prototypes': [],
                'subtype': null, 'isPrimitive': true};
    } else if ( val === null ) {
        return {'type': 'null', 'prototypes': [],
                'subtype': null, 'isPrimitive': true};
    }
    var ps = objects.prototypes(val);
    return {
        'type': 'object', 
        'prototypes': ps, 
        'subtype': (ps.length > 0) ? ps[0].constructor.name : null,
        'isPrimitive': !(val instanceof Object)
    };
}

function isArray(val) {
    return val instanceof Array;
}

function isArguments(val) {
    return Object.prototype.toString.call(obj) === '[object Arguments]';
}


module.exports = {
    'type':  type,
    'isArray': isArray,
    'isArguments': isArguments
};

