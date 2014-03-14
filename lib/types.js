'use strict';


function isProto(obj, possible_prototype) {
    return possible_prototype.isPrototypeOf(obj);
}

function getPrototypes(obj) {
    var protos = [],
        parent = obj;
    while ( true ) { // seems to eventually get to null
        parent = Object.getPrototypeOf(parent);
        if ( parent === null ) {
            break;
        }
        protos.push(parent);
    }
    return protos;
}

function getTypeData(val) {
    if ( val instanceof Object ) {
        var protos = getPrototypes(val);
        return {
            'type'       : 'object', // that's right -- even for functions
            'prototypes' : protos,
            'subtype'    : (protos.length > 0) ? protos[0].constructor.name : null,
            'isPrimitive': false,
            'toString'   : Object.prototype.toString.call(val)
        };
    }
    // else: it's a primitive
    return {
        'type'       : ( val === null ) ? "null" : typeof val,
        'prototypes' : null,
        'subtype'    : null,
        'isPrimitive': true,
        'toString'   : Object.prototype.toString.call(val)
    };
}


module.exports = {
    'getTypeData'  :  getTypeData,
    'getPrototypes': getPrototypes,
    'isProto'      : isProto
};
