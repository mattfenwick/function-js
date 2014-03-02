/*
 - member access -- getting and setting
 - object creation
 - class, prototype, etc. creation
 - methods -- function wrappers around things like f.apply(...)
 - constructor creation
 - constructor invocation
*/
'use strict';

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
// lists


// application

// `this`
// exceptions
// control structures

// fun functions


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


module.exports = {
    'error'  : error,
    'type'   : type,
    'foldr'  : foldr,
    'foldl'  : foldl
};

