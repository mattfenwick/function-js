'use strict';

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


function pairs(obj) {
    // Object -> [(String, a)]
    return Object.keys(obj).map(function(k) {return [k, obj[k]];});
}


function Graph(vertices, edges) {
    // Set String -> [(String, String)] -> Graph
    // add each vertex
    this._vertices = new Set([]);
    this._edges = {};
    var self = this;
    vertices.elems().map(function(e) {self.addNode(e);});
    // add each edge
    edges.map(function(pair) {
	self.addEdge(pair[0], pair[1]);
    });
}

Graph.prototype.addNode = function(name) {
    console.log('trying to add vertex ' + name);
    if ( !this._vertices.has(name) ) {
	this._vertices.add(name);
	this._edges[name] = new Set([]);
    }
};

Graph.prototype.addEdge = function(from, to) {
    if ( !(this._vertices.has(from) && this._vertices.has(to)) ) {
	throw new Error('invalid node name -- ' + from + ' or ' + to);
    }
    this._edges[from].add(to);
    this._edges[to].add(from);
};

Graph.prototype.neighbors = function(name) {
    if ( !this._vertices.has(name) ) {
	throw new Error('invalid node name -- ' + name);
    }
    return this._edges[name];
};

Graph.prototype.shortestPath = function(from, to) {
    if ( !this._vertices.has(from) || !this._vertices.has(to) ) {
	throw new Error('can not find path -- invalid vertices (' + from + ', ' + to + ')');
    }
    var visited = new Set([from]),
        costs = {},
        current = from,
        next = [],
        cost,
        count = 0;
    costs[from] = 0;
    while ( true ) {
	count++; if ( count > 100 ) {console.log('aborting');break;}
	console.log(JSON.stringify({'costs': costs, 'current': current, 
                                    'next': next, 'cost': cost,
				    'visited': visited}));
	cost = costs[current] + 1; // 1 b/c all edges weighted equally
        // for current node: find all unvisited neighbors and costs;
	this.neighbors(current).elems().map(function(e) {
	    if ( visited.has(e) ) {
	        // skip, nothing to do
	    } else if ( !(e in costs) || (cost < costs[e]) ) {
                // found lower cost, or no previous cost -> set cost
		costs[e] = cost;
	    }
        });
	next = pairs(costs)
	    .filter(function(n) {return !visited.has(n[0]);})
	    .sort(function(a, b) {return a[1] - b[1];});
	// termination condition: no unvisited neighbors left
	if ( next.length === 0) {
	    if ( !(to in costs) ) {
		throw new Error('unable to find path from ' + from + ' to ' + to);
	    }
	    break;
	}
	// termination condition: already found a path to goal,
	//   and its cost is sure to be lower than any others we find
	if ( (to in costs) && (next[0][1] > costs[to]) ) {
	    break;// done!
	}
	// choose the one with the lowest cost
	// mark it visited, make it the new current, it's no longer a neighbor
	current = next[0][0];
	visited.add(current);
    }
    return costs[to];
};


var states = new Graph(new Set([
        "CT", "NY", "IA", "NE", "FL", "VA", "MA", "CO"
    ]),
    [
	["NE", "IA"],
	["CT", "NY"]
    ]);

var eg = new Graph(new Set(['a', 'b', 'c', 'd', 'e', 'f']),
		   [['a', 'b'], ['a', 'c'], ['b', 'c'], ['c', 'd'],
		    ['b', 'e'], ['e', 'f'], ['a', 'f']]);

var trp = new Graph(new Set(['H', 'N', 'C', 'O', 'CA', 'HA', 'CB', 'HB2', 'HB3',
			     'CG', 'CD1', 'HD1', 'NE1', 'HE1', 'CE2', 'CZ2', 'HZ2',
			     'CH2', 'HH2', 'CZ3', 'HZ3', 'CE3', 'HE3', 'CD2']),
		    [['H', 'N'], ['N', 'CA'], ['CA', 'HA'], ['CA', 'C'], ['C', 'O'],
		     ['CA', 'CB'], ['CB', 'HB2'], ['CB', 'HB3'], ['CB', 'CG'],
		     ['CG', 'CD1'], ['CD1', 'HD1'], ['CD1', 'NE1'], ['NE1', 'HE1'],
		     ['NE1', 'CE2'], ['CE2', 'CZ2'], ['CZ2', 'HZ2'], ['CZ2', 'CH2'],
		     ['CH2', 'HH2'], ['CH2', 'CZ3'], ['CZ3', 'HZ3'], ['CZ3', 'CE3'],
		     ['CE3', 'HE3'], ['CE3', 'CD2'], ['CD2', 'CE2'], ['CD2', 'CG']]);

var nope = new Graph(new Set(['a', 'b', 'c']),
		     [['a', 'b']]);

module.exports = {
    'Graph': Graph,
    'states': states,
    'eg': eg,
    'trp': trp,
    'nope': nope
};
