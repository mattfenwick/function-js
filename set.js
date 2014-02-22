'use strict';


// limited to strings, for now, b/c it uses `in` operator and object keys
function Set(elements) {
    var elems = {};
    elements.map(function(e) {
	if ( e in elems ) {
	    // nothing to do -- it's just a dupe
	} else {
	    elems[e] = 1;
	}
    });
    this._elements = elems;
}

Set.prototype.has = function(e) {
    return e in this._elements;
};

Set.prototype.add = function(e) {
    this._elements[e] = 1;
};

Set.prototype.del = function(e) {
    delete this._elements[e];
};

Set.prototype.elems = function() {
    return Object.keys(this._elements);
};

Set.prototype.minus = function(other) {
    function predicate(e) {
	return !other.has(e);
    }
    var elems = this.elems().filter(predicate);
    return new Set(elems);
};


module.exports = Set;

