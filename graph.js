'use strict';
var Set = require('./set.js');
var Queue = require('./queue.js');
var Stack = require('./stack.js');


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

function defaultSort(x, y) {
    if ( x === y) {
        return 0;
    } else if ( x < y ) {
        return -1;
    } 
    return 1;
}

Graph.prototype.depthFirst = function(start, f) {
    if ( !f ) {f = defaultSort;}
    var stack = new Stack([start]),
        visited = new Set([]),
        order = [],
        current;
    while ( stack.length() > 0 ) {
        current = stack.pop();
        // what if 'current' has already been visited?
        if ( visited.has(current) ) {
            continue;
        }
        console.log(JSON.stringify([current, stack, order, visited]));
        order.push(current);
        visited.add(current);
        // reverses so that the sort function makes sense, and the elements at the
        // front of the sorted array get to the top of the stack
        this.neighbors(current).elems().sort(f).reverse().map(function(n) {
            stack.push(n);
        });
    }
    return order;
};

Graph.prototype.breadthFirst = function(start, f) {
    if ( !f ) {f = defaultSort;}
    var queue = new Queue([start]),
        visited = new Set([]),
        order = [],
        current;
    while ( queue.length() > 0 ) {
        current = queue.remove();
        // what if 'current' has already been visited?
        if ( visited.has(current) ) {
            continue;
        }
        console.log(JSON.stringify([current, queue, order, visited]));
        order.push(current);
        visited.add(current);
        this.neighbors(current).elems().sort(f).map(function(n) {
            queue.add(n);
        });
    }
    return order;
};


module.exports = Graph;

