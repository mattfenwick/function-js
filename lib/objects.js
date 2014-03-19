'use strict';


function fromArray(pairs) {
    // [(String, a)] -> Map String [a]
    var obj = Object.create(null),
        ownCheck = Object.prototype.hasOwnProperty;
    pairs.map(function(p) {
        var key = p[0],
            val = p[1];
        if ( !ownCheck.call(obj, key) ) {
            obj[key] = [];
        }
        obj[key].push(val);
    });
    return obj;
}

function toArray(obj) {
    // just own key/val (but includes non-enumerable)
    return Object.getOwnPropertyNames(obj).map(function(name) {
        return [name, obj[name]];
    });
}

function fmap(f, obj) {
    // q: just own key/val
    var new_obj = Object.create(Object.getPrototypeOf(obj));
    Object.getOwnPropertyNames(obj).map(function(name) {
        new_obj[name] = f(obj[name]);
    });
    return new_obj;
}

function merge(objs) {
    var keyVals = [];
    objs.map(function(o) {
        keyVals = keyVals.concat(toArray(o));
    });
    return fromArray(keyVals);
}

function squash(obj) {
    // create new object which includes properties from entire prototype chain
    // including non-enumerable, overridden, etc.
    var obj_chain = [];
    while ( obj !== null ) {
        obj_chain.push(obj);
        obj = Object.getPrototypeOf(obj);
    }
    return merge(obj_chain);
}


module.exports = {
    'fromArray': fromArray,
    'toArray'  : toArray  ,
    'fmap'     : fmap     ,
    'merge'    : merge    ,
    'squash'   : squash
};
