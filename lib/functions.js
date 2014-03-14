'use strict';


function getArgs(args) {
    return Array.prototype.slice.call(args);
}

function apply_(f, args) {
    // (a -> ... -> z) -> [a ...] -> z
    return f.apply(null, args);
}

function call_(f) {
    // (a -> ... -> z) -> a -> ... -> z
    var args = getArgs(arguments).slice(1);
    return apply_(f, args);
}

function partial(f) {
    var args = getArgs(arguments).slice(1);// ignore the function
    return function() {
        var innerArgs = getArgs(arguments),
            fullArgs = args.concat(innerArgs);
        return apply_(f, fullArgs);
    };
}


// some combinators

function curry(f, x, y) {
    // ((a, b) -> c) -> a -> b -> c
    return f([x, y]);
}

function uncurry(f, pair) {
    // (a -> b -> c) -> (a, b) -> c
    return f(pair[0], pair[1]);
}

function id(x) {
    return x;
}

/*function const(x) {
    // um ... this is exactly the same as `id`.  is that a problem?
    return x;
}*/

function compose(f, g, x) {
    // (a -> b) -> (b -> c) -> a -> c
    return f(g(x));
}

function on(f, g, x, y) {
    // (b -> b -> c) -> (a -> b) -> a -> a -> c
    return f(g(x), g(y));
}

function dupe(x) {
    // a -> (a, a)
    return [x, x];
}

function split(f, g, x) {
    // (a -> b) -> (a -> c) -> a -> (b, c)
    return [f(x), g(x)];
}


module.exports = {
    'getArgs' : getArgs ,

    'apply_'  : apply_  ,
    'call_'   : call_   ,
    'partial' : partial ,

    'curry'   :  curry  ,
    'uncurry' :  uncurry,
    'id'      : id      ,
    'compose' : compose ,
    'on'      : on      ,
    'dupe'    : dupe    ,
    'split'   : split
};
