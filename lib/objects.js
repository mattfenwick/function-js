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
    return Object.getOwnPropertyNames(obj).map(function(n) {
        return [name, obj[name]];
    });
}

function fmap(f, obj) {
    // q: all values, or just own values?
    // a: just own values -- don't want to worry about prototype chain
    var pairs = toArray(obj).map(function(pair) {
        return [pair[0], f(pair[1])];
    });
    return fromArray(pairs);
}

function merge(f, obj1, other) {
    // merge own properties of two objects
    // if 1 object has a key, cool
    // if both have it, call f to resolve
    // let a = {'a': 1, 'b': 2};
    // let b = {'a': 3, 'c': 4};
    // merges:
    //   a wins: {'a': 1, 'b': 2, 'c': 4}  
    //   b wins: {'a': 3, 'b': 2, 'c': 4}
    //   all arrays:  {'a': [1, 3], 'b': [2], 'c': [4]}
    //   undefs:      {'a': [1, 3], 'b': [2, undefined], 'c': [undefined, 4]} (then do fmap(any, ...) to get 1st truthy ... but that would fail if there were actual undefineds, or other falsy values
    //   some arrays: {'a': [1, 3], 'b': 2, 'c': 4}
    //   other1:  {'a': ???, 'b': 2, 'c': 4}
    //   other2:  {'a': ???, 'b': ?, 'c': ?}
    // what about explicit undefined values in input?  those should be preserved, and distinguished from any new undefineds, right?
    throw new Error('haven't figure out yet');
}

function mergeN() {
    // merge own properties of multiple objects
}

function squash(obj) {
    // create new object which includes properties from entire prototype chain
    // q:  *all* of them? including non-enumerable, overridden, etc.
    // a: yes, *all*
    // maybe return value is {'key': [...list of values...]}
    throw new Error('oops');
}


module.exports = {
    'fromArray': fromArray,
    'toArray'  : toArray  ,
    'fmap'     : fmap     ,
    'merge'    : merge    ,
    'squash'   : squash
};
