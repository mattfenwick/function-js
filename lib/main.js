/*
 - member access -- getting and setting
 - object creation
 - class, prototype, etc. creation
 - methods -- function wrappers around things like f.apply(...)
 - constructor creation
 - constructor invocation
 - `this`
 - exceptions
 - control structures
*/
'use strict';

function error(e) {
    throw new Error(e);
}



module.exports = {
    'error'  : error
};
