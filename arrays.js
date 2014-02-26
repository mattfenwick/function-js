'use strict';


function binSearch_helper(arr, elem, low, high) {
    console.log(JSON.stringify([arr, elem, low, high]));
    if ( low > high ) {
        return false;
    }
    if ( low === high ) {
        return arr[low] === elem;
    }
    var mid = Math.floor((low + high) / 2);
    if ( arr[mid] === elem ) {
        return true;
    } else if ( arr[mid] > elem ) {
        return binSearch_helper(arr, elem, low, mid - 1);
    } else {
        return binSearch_helper(arr, elem, mid + 1, high);
    }
}

function binSearch(arr, elem) {
    // assumes input is sorted
    if ( arr.length === 0 ) {return false;}
    return binSearch_helper(arr, elem, 0, arr.length - 1);
}

module.exports = {
    'binSearch': binSearch,
    'arrs': [[], [13], [18], [3, 5], [21, 27], [4, 40], [5, 13], [13, 25], 
             [1, 13, 26], [1,2,13], [13, 14, 15], [1, 12, 26],
             [4, 7, 12, 15, 18, 27, 32], [4, 7, 13, 15, 18, 27, 32]]
};

