'use strict';
var Graph = require('./graph.js');
var Set = require('./set.js');


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

var met = new Graph(new Set(['H', 'N', 'C', 'O', 'CA', 'HA', 'CB', 'HB2', 'HB3',
                             'HG2', 'HG3', 'CG', 'SD', 'CE', 'HE1', 'HE2', 'HE3']),
                    [['H', 'N'], ['N', 'CA'], ['CA', 'HA'], ['CA', 'C'], ['C', 'O'],
                     ['CA', 'CB'], ['CB', 'HB2'], ['CB', 'HB3'], ['CB', 'CG'], 
                     ['CG', 'HG2'], ['CG', 'HG3'], ['CG', 'SD'], ['SD', 'CE'],
                     ['CE', 'HE1'], ['CE', 'HE2'], ['CE', 'HE3']]);

var simple = new Graph(new Set(['a', 'b', 'c']),
                       [['a', 'b']]);

var you = new Graph(new Set(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']),
                    [['a', 'b'], ['a', 'd'], ['a', 'g'], ['b', 'e'], ['b', 'f'],
                     ['e', 'g'], ['d', 'f'], ['f', 'c'], ['c', 'h']]);

module.exports = {
    'states': states,
    'eg'    : eg    ,
    'trp'   : trp   ,
    'met'   : met   ,
    'simple': simple,
    'you'   : you
};

