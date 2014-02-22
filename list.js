'use strict';


function List(elems) {
    this._back = {'next': undefined};
    this._front = this._back;
    this._length = 0;
    var self = this;
    elems.map(function(e) {
        self.push(e);
    });
}

List.prototype.elems = function() {
    var out = [],
        current = this._front;
    while ( current.next !== undefined ) {
        out.push(current.value);
        current = current.next;
    }
    return out;
};

List.prototype.length = function() {
    return this._length;
};

// remove from front
List.prototype.shift = function() {
    if ( this.length() === 0 ) {
        throw new Error("can't shift empty List");
    }
    this._front = this._front.next;
    this._length--;
};

// add to front
List.prototype.unshift = function(elem) {
    var newE = {'next': this._front, 'value': elem};
    this._front = newE;
    this._length++;
};

List.prototype.push = function(elem) {
    var newE = {'next': undefined},
        oldBack = this._back;
    oldBack.value = elem;
    oldBack.next = newE;
    this._back = newE;
    this._length++;
};


module.exports = List;

