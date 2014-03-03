'use strict';


module.exports = {
    // infix 
    'plus' : function(x, y) {return x + y;},
    'star' : function(x, y) {return x * y;},
    'minus': function(x, y) {return x - y;},
    'has'  : function(obj, prop) {return prop in obj;},
    'hasOwn': function(obj, prop) {return obj.hasOwnProperty(prop);},
    'dot': function(obj, prop) {return obj[prop];},    // works for both `obj.prop` and `obj['some string']`
    'minus': function(x, y) {return x - y;},
    'delete': function(obj, prop) {
        // TODO: could return some indicator of whether this worked
        // TODO: also could check to make sure the delete is allowed
        return (delete obj[prop]);
    },
    'isInstanceOf': function(obj, func) {
        // 2nd arg must be a func
        return obj instanceof func;
    },
    'rem': function(x, y) {return x % y;},
    'comma': function(x, y) {return y;},
    'bitwise': {
        'leftShift'         : function(x, y) {return x <<  y;},
        'and'               : function(x, y) {return x  &  y;},
        'or'                : function(x, y) {return x  |  y;},
        'xor'               : function(x, y) {return x  ^  y;},
        'rightShift'        : function(x, y) {return x >>  y;},
        'zeroFillRightShift': function(x, y) {return x >>> y;},
        'not'               : function(x) {return ~x;},
    },
    'doubleEquals'   : function(x, y) {return x  == y;},
    'notEquals'      : function(x, y) {return x  != y;},
    'tripleEquals'   : function(x, y) {return x === y;},
    'notDoubleEquals': function(x, y) {return x !== y;},
    'greaterThan'    : function(x, y) {return x  >  y;},
    'greaterThanOrEqualTo': function(x, y) {return x >= y;},
    'lessThan': function(x, y) {return x < y;},
    'lessThanOrEqualTo': function(x, y) {return x <= y;},
    'and': function(x, y) {return x && y;},
    'or': function(x, y) {return x || y;},

    // prefix

    'typeOf': function(val) {
        // function, number, string, object, boolean, undefined
        // ?maybe? xml, not sure about host object
        return (typeof val);
    },

    'void_': function(x) {return (void x);},

    'new_': function(Constructor /*, args ... */) {
        throw new Error('oops, need to figure out how to apply on constructors');
        var args = getArgs(arguments).slice(1);
        return new Constructor(); // um, I actually don't know how to pass args
    },
    'not': function(x) {return !x;},
    'unaryPlus': function(x) {return +x;},
    'unaryMinus': function(x) {return -x;},
    
    // postfix
    
    //ternary
    'conditional': function(condition, iftrue, iffalse) {
        // does not exactly match `a ? b : c` semantics because
        //   of eager evaluation of function arguments
        return (condition ? iftrue : iffalse);
    },

    // not sure if I can do these, due to assignment's complications:
    // prefix:  ++, --
    // postfix: ++, --
    // infix: =, *=, /=, %=, +=, -=, <<=, >>=, >>>=, &=, ^=, |=
};

