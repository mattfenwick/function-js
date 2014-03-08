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

function id(x) {
    return x;
}

/*function const(x) {
    // um ... this is exactly the same as `id`.  is that a problem?
    return x;
}*/

function flip(f) {
    // (a -> ... -> y -> z) -> a -> ... -> y -> z
    var args = getArgs(arguments).slice(1);
    return apply_(f, reverse(args));
}

function compose(f, g, x) {
    // (a -> b) -> (b -> c) -> a -> c
    return f(g(x));
}

function on(f, g, x, y) {
    // (b -> b -> c) -> (a -> b) -> a -> a -> c
    return f(g(x), g(y));
//    return f(appN(dupe(g), [x, y]));
}

function appN(fs, xs) {
    // [a -> b] -> [a] -> [b]
    // I think this is similar to the ZipList applicative instance
    // (a -> b, c -> d, ...) -> (a, c, ...) -> (b, d, ...)
    return map(uncurry(call_), zip(fs, xs));
}

function dupe(x) {
    // a -> (a, a)
    return [x, x];
}

function split(f, g, x) {
    // (a -> b) -> (a -> c) -> a -> (b, c)
    return [f(x), g(x)];
//    return app2([f, g], dupe(x));
}


module.exports = {
    'getArgs' : getArgs ,
    'apply_'  : apply_  ,
    'call_'   : call_   ,
    'partial' : partial ,

    'id'      : id      ,
    'flip'    : flip    ,
    'compose' : compose ,
    'on'      : on      ,
    'appN'    : appN    ,
    'dupe'    : dupe    ,
    'split'   : split
};
