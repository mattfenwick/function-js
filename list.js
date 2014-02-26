'use strict';

// I think that `_back` is only used so that pushing is O(1) instead of O(n)
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

// remove element, anywhere in list, by equality test
List.prototype.remove = function(x) {
    if ( this.length() === 0 ) { 
        // nothing to do
    } else if ( this._front.value === x ) {
        this._front = this._front.next;
        this._length--;
    } else {
        var curr = this._front;
        while ( curr.next ) {
            if ( curr.next.value === x ) {
                curr.next = curr.next.next;
                this._length--;
                break;
            }
            curr = curr.next;
        }
    }
};

List.prototype.has = function(elem) {
    var curr = this._front;
    while ( curr !== undefined ) {
        if ( curr.value === elem ) {
            return true;
        }
        curr = curr.next;
    }
    return false;
}

List.prototype.length = function() {
    return this._length;
};

// remove from front
List.prototype.shift = function() {
    if ( this.length() === 0 ) {
        throw new Error("can't shift empty List");
    }
    var value = this._front.value;
    this._front = this._front.next;
    this._length--;
    return value;
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

List.prototype.toString = function() {
    return JSON.stringify({'type': 'List', 'elems': this.elems()});
};


module.exports = List;

