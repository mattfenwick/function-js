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
    return funcs.getArgs(arguments);
}

function sortBy(f, xs) {
    // (a -> a -> Ordering) -> [a] -> [a]
    var arr = xs.slice();
    return arr.sort(f);
}

function sortWith(f, xs) {
    // Ord b => (a -> b) -> [a] -> [a]
    // not sure how to express the typeclass constraint
    // `ops['-']` should really be `compare` to enable non-numeric comparisons
    return sortBy(funcs.partial(funcs.on, ops['-'], f), xs);
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

function concatN(arrays) {
    var totalLength = sum(map(function(a) {return a.length;}, arrays)),
        newArray = new Array(totalLength),
        i = 0;
    arrays.map(function(array) {
        array.map(function(elem) {
            newArray[i] = elem;
            i++;
        });
    });
    return newArray;
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

// any, all, and product *could* short-circuit (on truthy, falsy, 0)
var any     = funcs.partial(foldl, ops['||'], false),
    all     = funcs.partial(foldl, ops['&&'], true),
    sum     = funcs.partial(foldl, ops['+'] , 0),
    product = funcs.partial(foldl, ops['*'] , 1);

// other stuff

function min(x, y) {
    return (x < y ? x : y);
}

function max(x, y) {
    return (x > y ? x : y);
}

var arrayMin = funcs.partial(foldl, min, Number.POSITIVE_INFINITY),
    arrayMax = funcs.partial(foldl, max, Number.NEGATIVE_INFINITY);

function zip(xs, ys) {
    // this could be generalized to any number of arrays
    var end = (xs.length < ys.length) ? xs.length : ys.length;
    var out = [];
    for (var i = 0; i < end; i++) {
        out.push([xs[i], ys[i]]);
    }
    return out;
}

function zipN(arrays) {
    if ( arrays.length === 0 ) {return [];} // base case.  ugly hack :(
    var minLength = arrayMin(map(function(a) {return a.length;}, arrays)),
        i = 0,
        newArray = [];
    for ( ; i < minLength; i++) {
        newArray.push(map(function(a) {return a[i];}, arrays));
    }
    return newArray;
}


// unfolds

function unfoldr(f_next, seed) {
    // (b -> Maybe (a, b)) -> b -> [a]
    var out = [],
        next;
    while ( true ) {
        next = f_next(seed);
        if ( next === undefined ) {break;}
        out.push(next[0]);
        seed = next[1];
    }
    return out;
}

function range(low, high, step) {
    if ( step <= 0 ) {throw new Error('invalid step size -- must be positive');}
    function f_next(seed) {
        if ( seed >= high ) {return undefined;}
        return [seed, seed + step];
    }
    return unfoldr(f_next, low);
}

function factorials(n) {
    function f_next(base, next) {
        base.push(next * base[base.length - 1]);
        return base;
    }
    return foldl(f_next, [1], range(1, n + 1, 1));
}

function fib(n) {
    function f_next(seed) {
        if ( seed[0] > n ) {return undefined;}
        return [seed[2], [seed[0] + 1, seed[2], seed[1] + seed[2]]];
    }
    return unfoldr(f_next, [1, 0, 1]);
}

function group() {
    throw new Error('oops -- undefined');
}

function appN(fs, xs) {
    // [a -> b] -> [a] -> [b]
    // I think this is similar to the ZipList applicative instance
    // (a -> b, c -> d, ...) -> (a, c, ...) -> (b, d, ...)
    return map(funcs.uncurry(funcs.call_), zip(fs, xs));
}

function flip(f) {
    // (a -> ... -> y -> z) -> a -> ... -> y -> z
    var args = funcs.getArgs(arguments).slice(1);
    return funcs.apply_(f, reverse(args));
}



module.exports = {
    'array'   :  array   ,
    'reverse' :  reverse ,
    'sortBy'  :  sortBy  ,
    'sortWith':  sortWith,
    'map'     :  map     ,
    'filter'  :  filter  ,
    'concat'  :  concat  ,
    'concatN' :  concatN ,
    'foldr'   :  foldr   ,
    'foldl'   :  foldl   ,
    'any'     :  any     ,
    'all'     :  all     ,
    'sum'     :  sum     ,
    'product' :  product ,
    
    'min'     :  min     ,
    'max'     :  max     ,
    'arrayMin':  arrayMin,
    'arrayMax':  arrayMax,
    
    'zip'     :  zip     ,
    'zipN'    :  zipN    ,
    'unfoldr' :  unfoldr ,
    'range'   :  range   ,
    'factorials': factorials,
    'fib'     :  fib     ,
    'group'   :  group   ,
    'appN'    :  appN    ,
    'flip'    :  flip
};
