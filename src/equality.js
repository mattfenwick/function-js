'use strict';


function eq(a, b) {
    var t_a = typeof a;
    if ( typeof a !== typeof b ) { return false; }
    if ( a === undefined ) { return (b === undefined); }
    if ( a === null ) { return (b === null); }
    if ( ( t_a === 'string' ) || ( t_a === 'boolean' ) ) {
        return ( a === b );
    }
    if ( t_a === 'function' ) { return (a === b); }
    if ( t_a === 'number' ) {
        if ( Number.isNaN(a) ) { return Number.isNaN(b); }
        return ( a === b );
    }
    // else -- we have an object
    if ( a === b ) { return true; }
    if ( Object.getPrototype(a) !== Object.getPrototype(b) ) { return false; }
    if ( ( a instanceof Number  ) || 
         ( a instanceof Boolean ) || 
         ( a instanceof String  ) {
        return eq(a.valueOf(), b.valueOf());
    }
    // RegExp
    // Date
    // Array
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

