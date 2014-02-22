'use strict';


function Stack(elems) {
    this._elems = elems;
}


Stack.prototype.push = function(elem) {
    this._elems.push(elem);
};


Stack.prototype.pop = function() {
    if ( this.length() === 0 ) {
        throw new Error("can't pop empty stack");
    }
    return this._elems.pop();
};


Stack.prototype.peek = function() {
    if ( this.length() === 0 ) {
        throw new Error("can't peek at empty stack");
    }
    return this._elems[this._elems.length - 1];
};


Stack.prototype.length = function() {
    return this._elems.length;
};


Stack.prototype.elems = function() {
    return this._elems;
};


Stack.prototype.toString = function() {
    return JSON.stringify({'type': 'Stack', 'elements': this._elems});
};


module.exports = Stack;

