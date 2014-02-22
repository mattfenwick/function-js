'use strict';


/*
 * implemented with a pair of arrays: one for adding, one for removing elements
 * relies on: pop/push at end of array, slice to make copies, reverse
 */ 
function Queue(elements) {
    this._front = elements.slice(); // since we're going to mutate the array, make a copy
    this._back = [];
}

Queue.prototype._flip = function() {
    if ( this._front.length === 0 ) {
        this._back.reverse();
        this._front = this._back;
        this._back = [];
    } else {
        // nothing to do
    }
};

Queue.prototype.length = function() {
    return this._front.length + this._back.length;
};

Queue.prototype.peek = function() {
    if ( this.length() === 0 ) {
        throw new Error("can't peek at empty queue");
    }
    this._flip();
    return this._front[this._front.length - 1];
};

Queue.prototype.remove = function() {
    if ( this.length() === 0 ) {
        throw new Error("can't remove element from empty queue");
    }
    this._flip();
    return this._front.pop();
};


Queue.prototype.add = function(elem) {
    this._back.push(elem);
};


// 'high' priority at the end
Queue.prototype.elems = function() {
    var es = this._back.slice().reverse();
    this._front.map(function(x) {
        es.push(x);
    });
    return es;
};


Queue.prototype.toString = function() {
    return JSON.stringify({'type': 'Queue', 'elements': this.elems()});
};


module.exports = Queue;

