'use strict';

function getArgs(args) {
    return Array.prototype.slice.call(args);
}

function reverse(xs) {
    // what about strings?
    var arr = [],
        i = 0;
    for ( ; i < xs.length; i++) {
        arr.unshift(xs[i]);
    }
    return arr;
}

function concat(xs, ys) {
    // [a] -> [a] -> [a]
    // what about strings?
    var arr = xs.slice(), // makes a copy
        i = 0;
    for ( ; i < ys.length; i++) {
        arr.push(ys[i]);
    }
    return arr;
}

function array() {
    return getArgs(arguments);
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

function any() {
    // `any` and `all` should be rewritten as folds
    for (var i = 0; i < arguments.length; i++) {
        if ( arguments[i] == true ) { // kind of odd, but I don't want non-booleans to be considered as truthy
            return arguments[i];
        } else if ( arguments[i] == false ) { // also odd
            // nothing to do
        } else {
            throw new Error('type error -- expected boolean');
        }
    }
    return false;
}

function all() {
    for (var i = 0; i < arguments.length; i++) {
        if ( arguments[i] == true ) { // odd.  see `any`
            // nothing to do
        } else if ( arguments[i] == false ) { // odd
            return arguments[i];
        } else {
            throw new Error('type error -- expected boolean');
        }
    }
    return true;
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

/*
 there's no way both `foldr` and `foldl` are right ... is there?
 gotta check.  haskell:
 foldr :: (a -> b -> b) -> b -> [a] -> b
 foldr f b [] = b
 foldr f b (x:xs) = foldr f (f x b) xs
 foldr f b (x:xs) = f x (foldr f b xs) -- <-- is it this one?
 
 foldr (:) [8] [1,2] = foldr (:) [1,8] [2]
                     = foldr (:) [2,1,8] []
                     = [2,1,8] ??????????
 foldr (:) [8] [1,2] = ??????? second way

 foldl :: (b -> a -> b) -> b -> [a] -> b
 foldl f b [] = b
 foldl f b (x:xs) = foldl f (f b x) xs
 foldl f b (x:xs) = f (foldl f b xs) x -- <-- is it this one?
*/
function foldr(f, b, xs) {
    // (a -> b -> b) -> b -> [a] -> b
    // foldr (+) 0 [1,2,3,4,5] =>
    //   ((((0+1)+2)+3)+4)+5
    if ( xs.length === 0 ) {
        return b;
    }
    return foldr(f, f(xs[0], b), xs.slice(1));
    // would be better to do this w/o recursion
}

function foldl(f, b, xs) {
    // (b -> a -> b) -> b -> [a] -> b
    // foldl (+) 0 [1,2,3,4,5] => 
    //   0+(1+(2+(3+(4+5))))
    if ( xs.length === 0 ) {
        return b;
    }
    return f(foldl(f, b, xs.slice(1)), xs[0]);
}

function group() {
    throw new Error('oops');
}


module.exports = {
    'getArgs' :  getArgs,
    'reverse' :  reverse,
    'concat'  :  concat,
    'array'   :  array,
    'range'   :  range,
    'curry'   :  curry,
    'uncurry' :  uncurry,
    'sortBy'  :  sortBy,
    'sortWith':  sortWith,
    'map'     :  map,
    'filter'  :  filter,
    'any'     :  any,
    'all'     :  all,
    'zip'     :  zip,
    'foldr'   :  foldr,
    'foldl'   :  foldl,
    'group'   :  group
};
