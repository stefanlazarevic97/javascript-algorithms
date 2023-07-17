// Write a function, `deepDup(arr)`, that will perform a "deep" duplication of
// the array and any interior arrays. A deep duplication means that the array 
// itself, as well as any nested arrays (no matter how deeply nested) are duped 
// and are completely different objects in memory than those in the original 
// array.

function deepDup(array) {
    return array.map((ele) => ele instanceof Array ? deepDup(ele) : ele);
}

// Write a `String.prototype.mySlice(startIdx, endIdx)` method. It should take 
// a start index and an (optional) end index and return a new string. Do NOT 
// use the built-in string methods `slice`, `substr`, or `substring`. 
// ex. 
// `abcde`.mySlice(2) => `cde`
// `abcde`.mySlice(1, 3) => `bc`

String.prototype.mySlice = function(start, end) {
    let newString = '';
    if (typeof end === "undefined") end = this.length;

    for (let i = start; i < end && i < this.length; i++) newString += this[i];

    return newString;
}

// Write a function, `anagrams(str1, str2)`, that takes in two words and returns 
// a boolean indicating whether or not the words are anagrams. Anagrams are 
// words that contain the same characters but not necessarily in the same order. 
// Solve this without using Array.prototype.sort.
// 
// Examples:
// anagrams('listen', 'silent') => true
// anagrams('listen', 'potato') => false

function anagrams(str1, str2) {
    let count = {};

    for (let char of str1) count[char] = (count[char] || 0) + 1;
    for (let char of str2) count[char] = (count[char] || 0) - 1;

    for (let char in count) if (count[char] !== 0) return false;
    
    return true;
}

// Write an `Array.prototype.myEach(callback)` method that invokes a callback
// for every element in an array and returns undefined. Do NOT use the built-in
// `Array.prototype.forEach`.

Array.prototype.myEach = function(callback) {
    for (let i = 0; i < this.length; i++) {
        callback(this[i]);
    }
}

// Write an `Array.prototype.myFilter(callback)` that takes a callback and 
// returns a new array which includes every element for which the callback 
// returned true. Use the `Array.prototype.myEach` method you defined above. Do 
// NOT call the built-in `Array.prototype.filter` or `Array.prototype.forEach` 
// methods.

Array.prototype.myFilter = function(callback) {
    let filtered = [];

    this.myEach((ele) => {
        if (callback(ele)) filtered.push(ele);
    })

    return filtered;
}

// Write an `Array.prototype.mergeSort` method that merge sorts an array. It
// should take an optional callback that compares two elements, returning -1 if 
// the first element should appear before the second, 0 if they are equal, and 1 
// if the first element should appear after the second. Define and use a helper 
// method, `merge(left, right, comparator)`, to merge the halves. 
//
// **IMPORTANT: Make sure to use a function declaration (`function merge`) as
// opposed to a function expression (`const merge = function`) for `merge`. Do
// NOT use the built-in `Array.prototype.sort` method in your implementation.**
//
// Here's a summary of the merge sort algorithm:
//
// Split the array into left and right halves, then merge sort them recursively
// until a base case is reached. Use a helper method, merge, to combine the
// halves in sorted order, and return the merged array.

Array.prototype.mergeSort = function(callback) {
    callback ||= function(a, b) {
        return Math.sign(a - b);
    }

    if (this.length < 2) return this;

    const center = Math.floor(this.length / 2);
    const left = this.slice(0, center).mergeSort(callback);
    const right = this.slice(center).mergeSort(callback);

    return merge(left, right, callback);
}

function merge(left, right, comparator) {
    let merged = [];

    while (left.length > 0 && right.length > 0) {
        if (comparator(left[0], right[0]) === -1){
            merged.push(left.shift());
        } else {
            merged.push(right.shift());
        }
    }

    return merged.concat(left, right);
}
// Write a `Function.prototype.inherits(ParentClass)` method. It should extend
// the methods of `ParentClass.prototype` to `ChildClass.prototype`.
//
// **Do NOT use `Object.create`, `Object.assign`, `Object.setPrototypeOf`, or
// modify the `__proto__` property of any object directly.**

Function.prototype.inherits = function(ParentClass) {
    function Surrogate() {};
    Surrogate.prototype = ParentClass.prototype;
    this.prototype = new Surrogate();
    this.prototype.constructor = this;
}

// Write a `Function.prototype.myCurry(numArgs)` method that collects arguments 
// until the number of arguments collected is equal to the original `numArgs` 
// value and then invokes the curried function.

Function.prototype.myCurry = function(numArgs) {
    let args = [];
    let func = this;

    function _curried(arg) {
        args.push(arg);

        if (args.length === numArgs) {
            return func(...args);
        } else {
            return _curried;
        }
    }

    return _curried;
}

// Write a `Function.prototype.myApply(context, argsArr)` method that accepts an
// object and an array of additional arguments. It should call the function with 
// the passed-in object as `this`, also passing the arguments array. Do NOT use 
// the built-in `Function.prototype.apply` or `Function.prototype.call` methods
// in your implementation.

Function.prototype.myApply = function(context, args = []) {
    return this.bind(context)(...args);
}

// Function.prototype.myBind = function(context, ...bindArgs) {
//     const that = this;
    
//     return function(...callArgs) {
//         return that.apply(context, bindArgs.concat(callArgs));
//     }
// }