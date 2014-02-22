'use strict';


function DLList(elems) {
    this._front = {'prev': undefined}; 
    this._back = {'prev': this._front, 'next': undefined};
    this._front.next = this._back;
    this._length = 0;
    var self = this;
    elems.map(function(e) {
        self.push(e);
    });
}


DLList.prototype.toString = function() {
    return JSON.stringify({'type': 'DLList', 'elems': this.elems()});
};

DLList.prototype.length = function() {
    return this._length;
};

DLList.prototype.elems = function() {
    var out = [],
        current = this._front.next;
    while ( current.next !== undefined ) {
        out.push(current.value);
        current = current.next;
    }
    return out;
};

DLList.prototype.shift = function() {
    if ( this.length() === 0 ) {
        throw new Error("can't shift empty DLList");
    }
    this._front.next = this._front.next.next;
    this._length--;
};

DLList.prototype.unshift = function(elem) {
    var newE = {'value': elem, 'prev': this._front, 'next': this._front.next};
    this._front.next.prev = newE;
    this._front.next = newE;
    this._length++;
};

DLList.prototype.pop = function() {
    if ( this.length() === 0 ) {
        throw new Error("can't pop empty DLList");
    }
    this._back.prev = this._back.prev.prev;
    this._length--;
};

DLList.prototype.push = function(elem) {
    var newE = {'value': elem, 'prev': this._back.prev, 'next': this._back};
    this._back.prev.next = newE;
    this._back.prev = newE;
    this._length++;
};


module.exports = DLList;

