

function properties(obj) {
    // not sure if this is really all too helpful
    // a -> Map String Integer
    var props = [],
        count_props = {},
        protos = parents(obj);
    // following could be rewritten as a map or something
    for (var i = 0; i < protos.length; i++) {
        console.log('property: ' + protos[i]);
        props = props.concat(ownNames(protos[i]));
    }
    // following part could be rewritten with a counter data structure
    for (var j = 0; j < props.length; j++) {
        var name = props[j];
        if (!Object.prototype.hasOwnProperty.call(count_props, name)) { // wow -- have to watch out for overridden methods
            count_props[name] = 0;
        }
        count_props[name]++;
    }
    return count_props;
}


