'use strict';


function fromArray(pairs) {
    // [(String, a)] -> Error e (Map String a)
    var obj = {};
    pairs.map(function(p) {
        var key = p[0],
            val = p[1];
        if ( obj.hasOwnProperty(key) ) {
            throw new Error('duplicate key: ' + key);
        }
        obj[key] = val;
    });
    return obj;
}

function toArray(obj) {
    // question: include key/val pairs on prototypes as well?
    throw new Error('oops');
}

function squash(obj) {
    // create new object which includes properties from entire prototype chain
    // question:  *all* of them?
    throw new Error('oops');
}


module.exports = {
    'fromArray': fromArray,
    'toArray': toArray
};
