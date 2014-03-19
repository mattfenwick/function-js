'use strict';


function fromArray(pairs) {
    // [(String, a)] -> Map String [a]
    var obj = {},
        ownCheck = Object.prototype.hasOwnProperty;
    pairs.map(function(p) {
        var key = p[0],
            val = p[1];
        if ( key === '__proto__' ) {
            throw new Error("unable to set property '__proto__' because it could affect the prototype chain");
        }
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
    // q: jost own key/val
    var new_obj = {};
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
    // PROBLEM:  this will probably end up with __proto__, and we **don't** want that
    //   so how do we filter it out ???
    return merge(obj_chain);
}


module.exports = {
    'fromArray': fromArray,
    'toArray'  : toArray  ,
    'fmap'     : fmap     ,
    'merge'    : merge    ,
    'squash'   : squash
};
