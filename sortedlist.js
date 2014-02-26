'use strict';

function SortedList(elems) {
    this._front = undefined;
    var self = this;
    elems.map(function(e) {
        self.insert(e);
    });
}

SortedList.prototype.remove = function(elem) {
    if ( this._front === undefined ) {
        // nothing to do
    } else if ( this._front.value === elem ) {
        this._front = this._front.next;
    } else {
        var curr = this._front;
        while ( curr.next !== undefined ) {
            if ( elem === curr.next.value ) {
                curr.next = curr.next.next;
                break;
            } else if ( elem < curr.next.value ) {
                break;
            }
            curr = curr.next;
        }
    }
};

SortedList.prototype.insert = function(elem) {
    if ( this._front === undefined || elem < this._front.value ) {
        this._front = {'next': this._front, 'value': elem};
        return;
    }
    var curr = this._front;
    while ( curr.next !== undefined && curr.next.value < elem ) {
        curr = curr.next;
    }
    var newElem = {'next': curr.next, 'value': elem};
    curr.next = newElem;
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

