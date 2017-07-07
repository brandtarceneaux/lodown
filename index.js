'use strict';

// YOU KNOW WHAT TO DO //

/**
 * Identity: A pass-through function used as a stub for true/false evaluation
 * 
 *  @param {anything} value: value can be any type of thing
 *  @return {Anything}: the input value, unchanged.
 * 
 */
 function identity(value) {
     return value;
 };
 module.exports.identity = identity;
 
/**
 * Typeof: a function that tests the type of value that is passed in
 * and returns a string of the value. Types are either string, array, object, 
 * undefined, number, boolean, date, null, or function. Any of these types of values
 * can be passed into Typeof. The function specifically evaluates for array, date,
 * and null because these will all evaluate to "object" otherwise. These three "if"
 * statements make the test more specific.
 * 
 * @param {anything} value: any type of value to be tested
 * @return {string}: a string descriing the type of the value passed in
 */
  
function typeOf(value) {
    if(Array.isArray(value)) return 'array';
    if(value instanceof Date) return 'date';
    if(value === null) return 'null';
    return typeof value;
};

module.exports.typeOf = typeOf;

/** 
 * first: a function that takes an array and a number. The function returns the 
 * first n items in the array, where n = number. If the arr argument is not an array, 
 * the function will return an empty array. If no number is passed in, or the num argument
 * is not a number, the function will return the first item in the array.
 * 
 * @param {array} arr: an array from which a certain number of elements will be returned
 * @param {number} num: a number specifiying how many items the function will return
 * from out of the array, starting at index 0.
 * @return {array}: an array containing the first n items from arr, or the first element
 * from arr if no number is passed in, or an empty array if arr is not an array.
*/
function first(arr, num) {
    if(!Array.isArray(arr) || num < 0) return [];
    if(num === undefined || typeof num !== 'number') return arr[0];
    return arr.slice(0, num);
};

module.exports.first = first;
 
 /** 
* first: a function that takes an array and a number. The function returns the 
 * last n items in the array, where n = number. If the arr argument is not an array, 
 * the function will return an empty array. If no number is passed in, or the num argument
 * is not a number, the function will return the last item in the array. This function
 * is analogous to first, but working from the end of the array backwards.
 * 
 * @param {array} arr: an array from which a certain number of elements will be returned
 * @param {number} num: a number specifiying how many items the function will return
 * from out of the array, starting at the last index (arr.length - 1).
 * @return {array}: an array containing the last n items from arr, or the last element
 * from arr if no number is passed in, or an empty array if arr is not an array.
*/

function last(arr, num) {
    if(!Array.isArray(arr) || num < 0) return [];
    if(num === undefined || typeof num !== 'number') return arr[arr.length - 1];
    if(num > arr.length) return arr;
    return arr.slice(-num);
};

module.exports.last = last;
 
/**
 * each: Designed to loop over a collection, Array or Object, and applies the 
 * action Function to each key in the collection.
 * 
 * @param {Array or Object} collection: The array or object that Each will iterate over.
 * @param {Function} action: The Function to be applied to each key in the 
 * collection; action will take the element at [i], i, and the entire collection
 * as arguments so the function is set up for multiple uses.
 */
function each(collection, action) {
    if(Array.isArray(collection)) {
        for(var i = 0; i < collection.length; i++) {
            action(collection[i], i, collection);
        }
    } else {
        for (var key in collection) {
            action(collection[key], key, collection);
        }
    }
};

module.exports.each = each;

/** 
* indexOf loops through an array and return the index position of the first instance
* of the value passed in as val. If the array does not contain an instance of val, 
* indexOf return '-1'.
* 
* @param {array} arr: the array that indexOf will loop through looking for val.
* @param {value} val: the value that indexOf will search for inside arr.
* @return {index}: indexOf will return the index position of the first instance of
* val inside of arr, or, if there is no instance of val inside arr, will return '-1'.
*/
function indexOf(arr, val) {
    for(var i = 0; i < arr.length; i++) {
        if(arr[i] === val) return i;
    }
    return -1;
};

module.exports.indexOf = indexOf;

/** 
* Filter loops over an array or object and applies a test to each element, each
* index, and the entire array or object. Filter then returns a new array of elements
* for which the test returned true. Filter uses the Each funtion to iterate through
* the array or object, passing in the collection and an anonymous function using
* element, index, and collection as parameters. For those elements that Test returns
* true for, the element is pushed into a return array called filtered. Finally, 
* Filter returns the array filtered.
* 
* @param {array or object} coll: the array that Filter will loop through and apply
* a test function to each element, index, and then the entire collection.
* @param {function} Test: The test that will be applied to coll. Since we are
* returning elements for which Test returns "true," Test must be set up to return
* boolean values.
* @return {array} filtered: The new array containing the elements that Test returned
* "true" for. This new array means that the original coll will be unchanged.
*/
function filter(coll, test) {
    var filtered = [];
    each(coll, function(element, index, coll) {
        if(test(element, index, coll)) filtered.push(element)
    });
    return filtered;
};

module.exports.filter = filter;

/**
* Reject loops over an array or object and applies a test to each element, each
* index, and the entire array or object. Filter then returns a new array of elements
* for which the test returned false. This is the inverse of Filter.
* Reject uses the Filter funtion, which also uses
* the Each function to iterate through the array or object, passing in the collection
* and an anonymous function using element, index, and collection as parameters. 
* For those elements that Test returns 'false' for (i.e., !(whatever Filtered returns)),
* the element is pushed into a return 
* array called rejected. Finally, Reject returns the array rejected.
* 
* @param {array or object} coll: the array that REject will loop through and apply
* a test function to each element, index, and then the entire collection.
* @param {function} Test: The test that will be applied to coll. Since we are
* returning elements for which Test returns "false," Test must be set up to return
* boolean values.
* @return {array} filtered: The new array containing the elements that Test returned
* "false" for. This new array means that the original coll will be unchanged.
*/
function reject(coll, test) {
    var rejected = [];
    filter(coll, function(element, index, coll) {
        if(!test(element, index, coll)) {
            rejected.push(element);
        }
    });
    return rejected;
};

module.exports.reject = reject;

/**
* Partition loops through an array and applies Test to each element, each index, 
* and the entire array. Partition will then return an array of arrays, with the 
* first sub-array containing the elements that Test returned truthy values for,
* and the second sub-array containing the elements that Test returned falsy values
* for. Partition uses Filter, which uses Each, to iterate through all the elements
* of coll and pushes the elements with truthy results from Test into the first 
* sub-array; else (i.e., falsy results) it pushes into the second sub-array. Partition
* then returns the array of arrays.
* 
* @param {array} coll: an array that Partition will iterate through and apply Test
* to each element, index, and the entire array.
* @param {function} Test: a test that will be applied to each element, index, and
* the entire array passed in as arr, and which will return either truthy or falsy values.
* @return {array of arrays} result: an array containing two arrays. The first sub-array
* will contain those values that Test returned truthy alues for, and the second will
* contain those elements that Test returned Falsy values for.
*/
function partition(coll, test) {
    var result = [[],[]];
    filter(coll, function(element, index, coll) {
        if(test(element, index, coll)) {
            result[0].push(element);
        } else {
            result[1].push(element)
        }
    });
    return result;
};

module.exports.partition = partition;

/** 
* Unique takes an array and returns a new array with all duplicate values removed
* (i.e., the new array will only contain unique values). Unique uses IndexOf,
* passing in an (initially) empty array and a true/false evaluation of whether 
* coll[i] is not found in the new array (i.e., IndexOf returns '-1' for coll[i]).
* If the value at coll[i] is not found in the new array, Unique pushes the value
* at coll[i] into the new array. Logically, if the next value (or any other value
* after coll[i]) is already in the new array (i.e., it does NOT return '-1' in IndexOf),
* then that value is not pushed into the new array, which will prevent duplication.
* Finally, Unique returns the new array.
* 
* @param {array} coll: This is the starting array that Unique will look through. 
* If coll contains duplicates, only the first of each duplicate value will get
* pushed into the new array. Since Unique creates a new array, the original coll
* remains unchanged.
* @return {array} uniques: this new array will contain only unique values pushed 
* in from coll.
*/
function unique(coll) {
    var uniques = [];
    for (var i = 0; i < coll.length; i++) {
        if (indexOf(uniques, coll[i]) === -1) {
            uniques.push(coll[i]);
        }
    }
    return uniques;
};

module.exports.unique = unique;

/**
* Map takes an array or an object and applies some function to it. If coll is an
* array, Test is applied to each element, index, and the entire array. If coll
* is an object, Test is applied to each key, value, and the entire object. Map
* uses Each to iterate through coll and passes in coll and some function with 
* element, i, and coll as arguments. Then, Map pushes the results of Test on each 
* element, i and coll into a new array. Finally, Map returns the new array. Map
* does not rely on a Test that only returns booleans since truthy or falsy is not
* a criterion for pushing the new values into the new array.
* 
* @param {array or object} coll: the array or object that Test will be applied to.
* Each determines whether coll is an array or object and iterates through accordingly.
* @param {function} Test: this is the function applied to coll to obtain some results.
* The resulting values are pushed into a new array.
* @return {array} result: this is the new array containing the values produced by
* applying Test to coll.
* 
*/
function map(coll, test) {
    const result = [];
    each(coll, function(element, i, coll) {
        result.push(test(element, i, coll));
    });
    return result;
};

module.exports.map = map;

/** 
* Pluck takes an array of objects and a property. Then, Pluck returns a new array 
* containing the values assigned to prop for each object in the array arr. Pluck
* uses the map function, passing in arr and a function that takes an object. Map
* itself uses Each to iterate through the array of objects. Map then pushes the value 
* paired with object[prop] into a new array, and after all iterations, all values 
* associated with prop inside of arr's objects  will be in the new array.
* 
* @param {array} arr: an array containing objects with prop as a key.
* @param {value} prop: the property that Pluck will find in each object in arr;
* each time, prop's value pair will be pushed into a new array by Map.
* @return {array} result: this is the array created by Map and returned at the
* end of Pluck.
*/
function pluck(arr, prop) {
    return map(arr, function(object) {
        return object[prop];
    });
};

module.exports.pluck = pluck;

/**
* Contains takes an array and a value and returns 'true' if the array contains the
* value and false if it does not. This function uses a ternary operator instead of
* If statements. The variable trueFalse is set to 'false' as default, and will only
* change to 'true' is a matching value is found. Contains invokes Each to iterate 
* through the array arr, passing in arr and a function that will check each element,
* index, and the entire array for a value matching val. The ternary operator states 
* that if the element at arr[i] matches the value passed in as val, then trueFalse
* will switch to 'true,' and if not, nothing will happen (the 0 in the ternary operator).
* Finally, Contains returns trueFalse.
* 
* @param {array} arr: the array whose elements Contains will check val against.
* @param {value} val: any value to check arr for.
* @return {boolean} trueFalse: this variable is set to 'false' initially and will
* only switch to true if the function run by Each finds a match for val (element === val).
*/
function contains(arr, val) {
    var trueFalse = false;
    each(arr, function(element, i, coll) {
        element === val ? trueFalse = true : 0;
    });
    return trueFalse;
};

module.exports.contains = contains;

/**
* Every takes an array or object and a function. Every iterates through the array
* or object and returns 'true' if every return value of applying the function to 
* the array or object is true, and returns 'false' if there are any values
* returned false. If there is no function passed in, Every will return 'true' if all
* the elements in coll are truthy and returns 'false' otherwise. The variable trueFalse
* is set to 'true' as a default, and will only switch to 'false' if a false result is found.
* Every uses Each to iterate through coll, passing in coll and a function taking element,
* index, and the entire collection as parameters. In the case that funct is a real function, 
* Each checks whether the result of Funct on element, index, and collection returns 'false,'
* and, if it is false, switches trueFalse to 'false.' In the case that Funct is not a
* function, Each iterates through the collection the same way, but only checking if the 
* element itself is falsy. If a falsy element is faound, trueFalse switches to 'false.'
* Finally, Every returns trueFalse.
* 
* @param {array or object} coll: the collection that Funct will be applied to. 
* @param {function} Funct: If Funct is a function, Every will evaluate the results 
* of Funct on coll for truthy/falsy. In case there is no funct, Every will simply evaluate the 
* elements of coll for truthy/falsy.
* @return {boolean} trueFalse: set to 'true' as a default, and only switches to 'false'
* if a false value is returned by Funct or, in the absence of Funct, if an element of 
* coll is evaluated as falsy.
*/
function every(coll, funct) {
    var trueFalse = true;
    if(typeof(funct) === 'function') {
        each(coll, function(element, i, coll) {
            if(!funct(element, i, coll)) {
                trueFalse = false;
            }
        });
    } else {
        each(coll, function(element, i, coll) {
            if(!element) {
                trueFalse = false;
            }
        });
    }
    return trueFalse;
};

module.exports.every = every;

/** 
* Some takes an array or object and a function. Some iterates through the array
* or object and returns 'true' if at least one return value of applying the function to 
* the array or object is true, and returns 'false' if every value is
* returned false. If there is no function passed in, Every will return 'true' if at least one
* element in coll is truthy and returns 'false' otherwise. The variable trueFalse
* is set to 'false' as a default, and will only switch to 'true' if a true result is found.
* Every uses Each to iterate through coll, passing in coll and a function taking element,
* index, and the entire collection as parameters. In the case that funct is a real function, 
* Each checks whether the result of Funct on element, index, and collection returns 'true,'
* and, if so, switches trueFalse to 'true.' In the case that Funct is not a
* function, Each iterates through the collection the same way, but only checking if the 
* element itself is truthy. If a truthy element is faound, trueFalse switches to 'true.'
* Finally, Some returns trueFalse.
* 
* @param {array or object} coll: the collection that Funct will be applied to. 
* @param {function} Funct: If Funct is a function, Every will evaluate the results 
* of Funct on coll for truthy/falsy. In case there is no funct, Every will simply evaluate the 
* elements of coll for truthy/falsy.
* @return {boolean} trueFalse: set to 'false' as a default, and only switches to 'true'
* if a true value is returned by Funct or, in the absence of Funct, if an element of 
* coll is evaluated as truthy.
*/
function some(coll, funct) {
     var trueFalse = false;
    if(typeof(funct) === 'function') {
        each(coll, function(element, i, coll) {
            if(funct(element, i, coll) === true) {
                trueFalse = true;
            }
        });
    } else {
        each(coll, function(element, i, coll) {
            if(element) {
                trueFalse = true;
            }
        });
    }
    return trueFalse;
};

module.exports.some = some;

/** 
* Reduce takes an array, a function, and a seed. Reduce calls Funct, passing in
* previous result, element, and index. The return value of Funct will become the
* previous result for the next iteration of Funct on arr. Seed will be "previous
* result" for the first iteration (because there is no "previous result" yet). If
* no seed was passed, the first element or value of collection will be seed (and
* therefore previous result). Reduce returns the value of the last iteration of 
* Funct on arr. The empty variable prev will stand in as the previous value for
* each iteration of Funct and will end up being the last value returned. Reduce
* uses Each to iterate through arr, passing in arr and a function taking each 
* element, index, and the entire collection as arguments. 
* 
* @param {array} arr: an array that Funct will operate on. If there is no seed 
* passed in, then the first element of this array will become the seed.
* @param {function} Funct: this is the function that will operate on arr. This 
* function takes prev, element, and index as arguments. Funct will return some 
* value on its last iteration, which will be returned at the end of Reduce.
* @return {value} prev: this variable hold the value of the previous iteration
* of Funct. After the last iteration of Funct, Reduce returns this value.
*/
function reduce(arr, funct, seed) {
    var prev;
      each(arr, function(element, i, coll) {
        if (seed < 0) {seed = arr[0];}
        if (typeof(seed) === "undefined") {seed = 1}
        if (!prev) {prev = seed;}
        prev = funct(prev, element, i);
    });
        return prev;
};

module.exports.reduce = reduce;

/** 
* Extend takes at least two objects, and possibly more, and copies the properties
* from the second object into origObj. If there are more objects, Extend also copies
* their properties into origObj in the order they appear in. Extend uses Each to
* iterate through the arguments of Reduce, passing in the arguments and a function
* taking newObj as an argument. This new function calls Each again to iterate through 
* newObj and takes newObj and a function taking value and key. As this inner Each 
* function loops through newObj, it takes its key/value pairs and copies them into
* origObj. Finally, after all object have been looped and copied, Extend returns 
* origObj, which has been updated with all the new key/value pairs.
* 
* @param {object} origObj: This is the original object that will be modified. There
* will follow another object and possibly more after the second one.
* @return {object} origObj: this is the original first object argument. Extend
* will return this object after looping through any other objects and copying 
* their key/value pairs to origObj.
*/
function extend(origObj){
    each(arguments, function(newObj) {
        each(newObj, function(value, key) {
            origObj[key] = value;
        });
    });
return origObj;
}