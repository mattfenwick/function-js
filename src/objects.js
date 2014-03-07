'use strict';


// error conditions: repeated key
// q: what to do if dupe key?
// a: (for now) throw error
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
    // q: include all key/val, or just own?
    // a: maybe let `squash` worry about all?  so just do own here
    throw new Error('oops');
}

function squash(obj) {
    // create new object which includes properties from entire prototype chain
    // q:  *all* of them? including non-enumerable, overridden, etc.
    // a: yes, *all*
    // maybe return value is {'key': [...list of values...]}
    throw new Error('oops');
}

function fmap(f, obj) {
    // q: all values, or just own values?
    // a: just own values -- don't want to worry about prototype chain
}


module.exports = {
    'fromArray': fromArray,
    'toArray': toArray
};
