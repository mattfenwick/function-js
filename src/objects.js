'use strict';


function ownNames(obj) {
    return Object.getOwnPropertyNames(obj);
}

function is(obj, possible_prototype) {
    return possible_prototype.isPrototypeOf(obj);
}

function parents(obj) {
    var ps = [],
        parent = new Object(obj); // takes care of primitives
    while ( parent !== null ) { // seems to eventually get to null
        ps.push(parent);
        parent = Object.getPrototypeOf(parent);
    }
    return ps;
}

function prototypes(obj) {
    // same as `parents`, but doesn't include `obj`
    return parents(obj).slice(1);
}

module.exports = {
    'ownNames'  : ownNames   ,
    'is'        : is         ,
    'prototypes': prototypes ,
    'parents'   : parents
};

