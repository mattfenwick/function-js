'use strict';


var canEqual = {'undefined': 1, 'string': 1, 'boolean': 1, 'function': 1};

function eq(a, b) {
    if ( typeof a !== typeof b ) { return false; }
    if ( ( a === null ) || canEqual.hasOwnProperty(typeof a) ) {
        return ( a === b );
    }
    if ( typeof a === 'number' ) {
        if ( Number.isNaN(a) ) { return Number.isNaN(b); }
        return ( a === b );
    }
    // else -- we have an object
    if ( a === b ) { return true; }
    if ( Object.getPrototype(a) !== Object.getPrototype(b) ) { return false; }
    if ( ( a instanceof Number  ) ||
         ( a instanceof Boolean ) ||
         ( a instanceof String  ) ) {
        return eq(a.valueOf(), b.valueOf());
    }
    // not sure how to deal with subclasses
    if ( Object.getPrototype(a) === Date.prototype ) {
        return a.valueOf() === b.valueOf();
    }
    if ( Object.getPrototype(a) === RegExp.prototype ) {
        return ( a.source === b.source && a.global === b.global &&
                 a.multiline === b.multiline && a.ignoreCase === b.ignoreCase );
    }
    // Array
    if ( Object.getPrototype(a) === Array.prototype ) {
        if ( a.length !== b.length ) { return false; }
        for (var i = 0; i < a.length; i++) {
            if ( !eq(a[i], b[i]) ) { return false; } // what about cyclic references?
        }
        return true;
    }
    // window, xml, html ???
    // prototypes ??
    // ... other objects ...
    // check own properties
    //   check keys
    //   check values
    //     have to recursively call eq
    //     have to detect cycles so as not to recur infinitely if there is own
    // maybe could try a user-defined equality method if it exists
    throw new Error('incomplete !');
}


module.exports = {
    'eq':  eq
};

