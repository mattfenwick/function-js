/*
 - member access -- getting and setting
 - object creation
 - class, prototype, etc. creation
 - methods -- function wrappers around things like f.apply(...)
 - constructor creation
 - constructor invocation
*/
// utility
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

function error(e) {
    throw new Error(e);
}

function type(obj) {
    // types:
    //  number, string, date, function,
    //  object, array, boolean, regexp
    //  arguments, null, undefined
    // but wait: there's overlap.  so what's the canonical type?
    if ( Object.prototype.toString.call(obj) === '[object Array]' ) {
	return 'array';
    }
    return (typeof t);
}
	

// operators
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
    delete obj[prop];
}

// lists

function array() {
    return getArgs(arguments);
}

function cons(x, xs) {
    error("oops -- haven't decided on representation yet");
}

function head(xs) {
    return xs[0];
}

function tail(xs) {
    return xs.slice(1);
}

// application
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

// `this`
// exceptions
// control structures

// fun functions
function on(f, g, x, y) {
    // (b -> b -> c) -> (a -> b) -> a -> a -> c
    return f(g(x), g(y));
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

function flip(f) {
    // (a -> ... -> y -> z) -> a -> ... -> y -> z
    var args = getArgs(arguments).slice(1);
    return apply_(f, reverse(args));
}

function compose(f, g, x) {
    // (a -> b) -> (b -> c) -> a -> c
    return f(g(x));
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

function id(x) {
    return x;
}

/*function const(x) {
    // um ... this is exactly the same as `id`.  is that a problem?
    return x;
}*/

function curry(f, x, y) {
    // ((a, b) -> c) -> a -> b -> c
    return f([x, y]);
}

function uncurry(f, pair) {
    // (a -> b -> c) -> (a, b) -> c
    return f(pair[0], pair[1]);
}


function f(x) {return x + 3;}
function g(y) {return y * 4;}
var h = partial(compose, f, g);

module.exports = {
    'getArgs': getArgs,
    'reverse': reverse,
    'concat' : concat,
    'error'  : error,
    'type'   : type,
    'plus'   : plus,
    'star'   : star,
    'minus'  : minus,
    'has'    : has,
    'hasOwn' : hasOwn,
    'dot'    : dot,
    'del'    : del,
    'array'  : array,
    'apply_' : apply_,
    'call_'  : call_,
    'partial': partial,
    'on'     : on,
    'sortBy' : sortBy,
    'sortWith': sortWith,
    'map'    : map,
    'filter' : filter,
    'foldr'  : foldr,
    'foldl'  : foldl,
    'flip2'  : flip2,
    'flipN'  : flipN,
    'compose': compose,
    'range'  : range,
    'id'     : id,
    'curry'  : curry,
    'uncurry': uncurry,
    'h'      : h
};
