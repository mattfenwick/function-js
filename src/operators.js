'use strict';


module.exports = {
    // infix
    '+'  : function(x, y) {return x + y;},
    '*'  : function(x, y) {return x * y;},
    '-'  : function(x, y) {return x - y;},
    '%'  : function(x, y) {return x % y;},
    '/'  : function(x, y) {return x / y;},
    'in' : function(obj, prop) {return prop in obj;},
    '.'  : function(obj, prop) {return obj[prop];},    // works for both `obj.prop` and `obj['some string']`
    'delete': function(obj, prop) {
        // TODO: could return some indicator of whether this worked
        // TODO: also could check to make sure the delete is allowed
        return (delete obj[prop]);
    },
    'instanceof': function(obj, func) {
        // 2nd arg must be a func
        return obj instanceof func;
    },
    ','  : function(x, y) {return y;},
    '<<' : function(x, y) {return x <<  y;},
    '&'  : function(x, y) {return x  &  y;},
    '|'  : function(x, y) {return x  |  y;},
    '^'  : function(x, y) {return x  ^  y;},
    '>>' : function(x, y) {return x >>  y;},
    '>>>': function(x, y) {return x >>> y;},
    '==' : function(x, y) {return x  == y;},
    '!=' : function(x, y) {return x  != y;},
    '===': function(x, y) {return x === y;},
    '!==': function(x, y) {return x !== y;},
    '>'  : function(x, y) {return x  >  y;},
    '>=' : function(x, y) {return x >= y;},
    '<'  : function(x, y) {return x < y;},
    '<=' : function(x, y) {return x <= y;},
    '&&' : function(x, y) {return x && y;},
    '||' : function(x, y) {return x || y;},

    // prefix

    'typeof': function(val) {
        // function, number, string, object, boolean, undefined
        // ?maybe? xml, not sure about host object
        return (typeof val);
    },

    'void': function(x) {return (void x);},

    'new': function(Constructor /*, args ... */) {
        throw new Error('oops, need to figure out how to apply on constructors');
        var args = getArgs(arguments).slice(1);
        return new Constructor(); // um, I actually don't know how to pass args
    },
    '!': function(x) {return !x;},
    '~'  : function(x) {return ~x;},

    'p+': function(x) {return +x;}, // how to differentiate from infix +/-??
    'p-': function(x) {return -x;},

    // postfix

    //ternary
    '?:': function(condition, iftrue, iffalse) {
        // does not exactly match `a ? b : c` semantics because
        //   of eager evaluation of function arguments
        return (condition ? iftrue : iffalse);
    },

    // not sure if I can do these, due to assignment's complications:
    // prefix:  ++, --
    // postfix: ++, --
    // infix: =, *=, /=, %=, +=, -=, <<=, >>=, >>>=, &=, ^=, |=
};

