'use strict';

var ops = require('./operators.js'),
    funcs = require('./functions.js');


function reverse(xs) {
    // what about strings?
    var arr = [],
        i = 0;
    for ( ; i < xs.length; i++) {
        arr.unshift(xs[i]);
    }
    return arr;
}

function array() {
    return ops.getArgs(arguments);
}

function range(low, high, step) {
    // Num -> Num -> Num -> [Num]
    var arr = [],
        i = low;
    if ( step <= 0 ) {error('invalid step size -- must be positive');}
    for ( ; i < high; i += step ) {
        arr.push(i);
    }
    return arr;
}

function curry(f, x, y) {
    // ((a, b) -> c) -> a -> b -> c
    return f([x, y]);
}

function uncurry(f, pair) {
    // (a -> b -> c) -> (a, b) -> c
    return f(pair[0], pair[1]);
}

function sortBy(f, xs) {
    // (a -> a -> Ordering) -> [a] -> [a]
    var arr = xs.slice();
    return arr.sort(f);
}

function sortWith(f, xs) {
    // Ord b => (a -> b) -> [a] -> [a]
    // not sure how to express the typeclass constraint
    // `minus` should really be `compare` to enable non-numeric comparisons
    return sortBy(partial(on, minus, f), xs);
}

function map(f, xs) {
    // (a -> b) -> [a] -> [b]
    return xs.map(f);
}

function filter(p, xs) {
    // (a -> Bool) -> [a] -> [a]
    var i = 0,
        arr = [];
    for ( ; i < xs.length; i++) {
        if ( p(xs[i]) ) {
            arr.push(xs[i]);
        }
    }
    return arr;
}

function concat(xs, ys) { // want to efficiently generalize to many arrays ...
    // [a] -> [a] -> [a]
    // what about strings?
    var arr = xs.slice(), // makes a copy
        i = 0;
    for ( ; i < ys.length; i++) {
        arr.push(ys[i]);
    }
    return arr;
}

// folds

function foldr(f, base, xs) {
    // (a -> b -> b) -> b -> [a] -> b
    // foldr (+) 0 [1,2,3,4,5] =>
    //   (1+(2+(3+0)))
    for ( var i = xs.length - 1; i >= 0; i-- ) {
        base = f(xs[i], base);
    }
    return base;
}

function foldl(f, base, xs) {
    // (b -> a -> b) -> b -> [a] -> b
    // foldl (+) 0 [1,2,3] => 
    //   (((0+1)+2)+3)
    for ( var i = 0; i < xs.length; i++ ) {
        base = f(base, xs[i]);
    }
    return base;
}

var any     = funcs.partial(foldl, ops['||'], false),
    all     = funcs.partial(foldl, ops['&&'], true),
    sum     = funcs.partial(foldl, ops['+'] , 0),
    product = funcs.partial(foldl, ops['*'] , 1);

// other stuff

function zip(xs, ys) {
    // this could be generalized to any number of arrays
    var end = (xs.length < ys.length) ? xs.length : ys.length;
    var out = [];
    for (var i = 0; i < end; i++) {
        out.push([xs[i], ys[i]]);
    }
    return out;
}

function group() {
    throw new Error('oops');
}


module.exports = {
    'reverse' :  reverse,
    'array'   :  array,
    'range'   :  range,
    'curry'   :  curry,
    'uncurry' :  uncurry,
    'sortBy'  :  sortBy,
    'sortWith':  sortWith,
    'map'     :  map,
    'filter'  :  filter,
    'concat'  :  concat,
    'foldr'   :  foldr,
    'foldl'   :  foldl,
    'any'     :  any,
    'all'     :  all,
    'sum'     :  sum,
    'product' :  product,
    'zip'     :  zip,
    'group'   :  group
};
