'use strict';

// operators
function plus(x, y) {
    return x + y;
}

function star(x, y) {
    return x * y;
}

function minus(x, y) {
    return x - y;
}

function has(obj, prop) {
    return prop in obj;
}

function hasOwn(obj, prop) {
    return obj.hasOwnProperty(prop);
}

function dot(obj, prop) {
    // works for both `obj.prop` and `obj['some string']`
    return obj[prop];
}

function del(obj, prop) {
    // TODO: could return some indicator of whether this worked
    // TODO: also could check to make sure the delete is allowed
    delete obj[prop];
}


module.exports = {
    'plus'   :  plus,
    'star'   :  star,
    'minus'  :  minus,
    'has'    :  has,
    'hasOwn' :  hasOwn,
    'dot'    :  dot,
    'del'    :  del
};

