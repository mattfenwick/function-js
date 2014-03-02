'use strict';


function proto(obj) {
    return Object.getPrototypeOf(obj);
}

function ownNames(obj) {
    return Object.getOwnPropertyNames(obj);
}

function protos(obj) {
    var ps = [],
        parent = proto(obj);
    while ( parent ) { // does it eventually get to null or to undefined?
        ps.push(parent);
        parent = proto(parent);
    }
    return ps;
}

function is(obj, possible_prototype) {
    // isn't this just `possible_prototype.isPrototypeOf(obj)`,
    //   maybe also with a check if possible_prototype is a primitive/null/undefined?
    // boundary condition: is(obj, obj) -->>  ????
    var prototypes = protos(obj);
    for (var i = 0; i < prototypes.length; i++) {
        if ( prototypes[i] == possible_prototype ) {
            return true;
        }
    }
    return false;
}

function isInstanceOf(obj, func) {
    // having the second arg be a constructor function is kind of weird
    var possible_prototype = func.prototype;
    return [obj instanceof func, possible_prototype.isPrototypeOf(obj), is(obj, possible_prototype)];
}

function properties(obj) {
    // a -> Map String Integer
    var props = [],
        count_props = {},
        prototypes = [obj].concat(protos(obj));
    for (var i = 0; i < prototypes.length; i++) {
        console.log('property: ' + prototypes[i]);
        props = props.concat(Object.getOwnPropertyNames(prototypes[i]));
    }
    for (var j = 0; j < props.length; j++) {
        var name = props[j];
        if (!Object.prototype.hasOwnProperty.call(count_props, name)) { // wow -- have to watch out for overridden methods
            count_props[name] = 0;
        }
        count_props[name]++;
    }
    return count_props;
}

function propChain(obj) {
    // kind of unnecessary -- wouldn't it just be something like:
    //   var chain = [obj].concat(protos(obj));
    //   var pChain = zip(chain, map(Object.getOwnPropertyNames));
    return [obj].concat(protos(obj)).map(function(o) {
        return [o, Object.getOwnPropertyNames(o)];
    });
}


module.exports = {
    'proto'     : proto  ,
    'protos'    : protos ,
    'properties': properties
};

