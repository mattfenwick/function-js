'use strict';

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
            fullArgs = concat(args, innerArgs);
        return apply_(f, fullArgs);
    };
}


module.exports = {
    'apply_'  : apply_  ,
    'call_'   : call_   ,
    'partial' : partial
};

