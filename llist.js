'use strict';


function Node(value, next) {
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
        node.next = Node(value, undefined); return node;
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

// add to front
function unshift(node, value) {
    return Node(node, value);
}


function toString(node) {
    return JSON.stringify(elems(node));
}


module.exports = {
  ... missing some stuff here ...
};
