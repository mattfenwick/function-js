'use strict';


function Node(next, value) {
    return {'next': next, 'value': value};
}

function elems(node) {
    var curr = node,
        out = [];
    while ( curr !== undefined ) {
        out.push(curr.value);
        curr = curr.next;
    }
    return out;
}

function remove(node, value) {
    if ( node === undefined ) {return undefined;}
    if ( node.value === value ) {return node.next}
    node.next = remove(node.next, value);
    return node;
}

function push(node, value) {
    if ( node.next === undefined ) {
        node.next = Node(undefined, value);
        return node;
    }
    node.next = push(node.next, value);
    return node;
}

function length(node) {
    if ( node === undefined ) {return 0;}
    return 1 + length(node.next);
}

// remove from front
function shift(node) {
    if ( node === undefined ) {
        throw new Error("can't shift empty List");
    }
    return node.next;
}

function has(node, elem) {
    if ( node === undefined ) {return false;}
    if ( node.value === elem ) {return true;}
    return has(node.next, elem);
}

function toString(node) {
    return JSON.stringify(elems(node));
}

function build(elems) {
    var list = undefined;
    for ( var i = elems.length - 1; i >= 0; i-- ) {
        list = Node(list, elems[i]);
    }
    return list;
}

module.exports = {
    'Node'    : Node    ,
    'shift'   : shift   ,
    'push'    : push    ,
    'length'  : length  ,
    'remove'  : remove  ,
    'toString': toString,
    'elems'   : elems   ,
    'has'     : has     ,
    'build'   : build
};

