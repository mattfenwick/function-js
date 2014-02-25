'use strict';

function SortedList(elems) {
    this._front = undefined;
    this._length = 0;
    var self = this;
    elems.map(function(e) {
        self.insert(e);
    });
}

SortedList.prototype.length = function() {
    return this._length;
};

SortedList.prototype.insert = function(elem) {
    if ( this.length() === 0 || elem < this._front.value ) {
        this._front = {'next': this._front, 'value': elem};
        this._length++;
        return;
    }
    var curr = this._front;
    while ( curr.next !== undefined && curr.next.value < elem ) {
        curr = curr.next;
    }
    var newElem = {'next': curr.next, 'value': elem};
    curr.next = newElem;
    this._length++;
};

SortedList.prototype.toString = function() {
    return JSON.stringify({'type': 'SortedList', 'elems': this.elems()});
};

SortedList.prototype.elems = function() {
    var current = this._front,
        out = [];
    while ( current !== undefined ) {
        out.push(current.value);
        current = current.next;
    }
    return out;
};

module.exports = SortedList;
