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
}

module.exports = {
    'id'     :  id,
    'flip'   :  flip,
    'compose':  compose,
    'on'     :  on
};

