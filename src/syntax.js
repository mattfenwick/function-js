'use strict';


// binary infix operators
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

function isInstanceOf(obj, func) {
    // 2nd arg must be a func
    return obj instanceof func;
}

function rem(x, y) {
    return x % y;
}

function comma(x, y) {
    return y;
}

var bitwise = {
    'leftShift'         : function(x, y) {return x <<  y;},
    'and'               : function(x, y) {return x  &  y;},
    'or'                : function(x, y) {return x  |  y;},
    'xor'               : function(x, y) {return x  ^  y;},
    'rightShift'        : function(x, y) {return x >>  y;},
    'zeroFillRightShift': function(x, y) {return x >>> y;},
    'not'               : function(x) {return ~x;},
};

function doubleEquals(x, y) {
    return x == y;
}

function notEquals(x, y) {
    return x != y;
}

function tripleEquals(x, y) {
    return x === y;
}

function notDoubleEquals(x, y) {
    return x !== y;
}

function greaterThan(x, y) {
    return x > y;
}

function greaterThanOrEqualTo(x, y) {
    return x >= y;
}

function lessThan(x, y) {
    return x < y;
}

function lessThanOrEqualTo(x, y) {
    return x <= y;
}

function and(x, y) {
    return x && y;
}

function or(x, y) {
    return x || y;
}


// ternary

function ternary(condition, iftrue, iffalse) {
    // does not exactly match `a ? b : c` semantics because
    //   of eager evaluation of function arguments
    return (condition ? iftrue : iffalse);
}

// prefix

function typeOf(val) {
    // function, number, string, object, boolean, undefined
    // ?maybe? xml, not sure about host object
    return (typeof val);
}

function void_(val) {
    return (void val);
}

function new_(Constructor /*, args ... */) {
    throw new Error('oops, need to figure out how to apply on constructors');
    var args = getArgs(arguments).slice(1);
    return new Constructor(); // um, I actually don't know how to pass args
}

function not(val) {
    return !val;
}

function unaryPlus(x) {
    return +x;
}

function unaryMinus(x) {
    return -x;
}


// not sure if I can do these do to assignment:
// prefix:  ++, --
// postfix: ++, --
// infix: =, *=, /=, %=, +=, -=, <<=, >>=, >>>=, &=, ^=, |=

module.exports = {
    'plus'        :  plus,
    'star'        :  star,
    'minus'       :  minus,
    'has'         :  has,
    'hasOwn'      :  hasOwn,
    'dot'         :  dot,
    'del'         :  del,
    'isInstanceOf':  isInstanceOf,
    'typeOf'      :  typeOf,
    'void_'       :  void_,
    'not'         :  not
};

