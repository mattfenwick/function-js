'use strict';


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

function zip(xs, ys) {
    // this could be generalized to any number of arrays
    var end = (xs.length < ys.length) ? xs.length : ys.length;
    var out = [];
    for (var i = 0; i < end; i++) {
        out.push([xs[i], ys[i]);
    }
    return out;
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
    'id'     :  id,
    'flip'   :  flip,
    'compose':  compose,
    'on'     :  on
};

