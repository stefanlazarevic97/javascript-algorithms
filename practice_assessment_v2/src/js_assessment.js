// Write a function, `fibsSum(n)`, that finds the sum of the first n
// fibonacci numbers recursively. Assume n > 0.
// Note that for this problem, the fibonacci sequence starts with [1, 1]. 

function fibsSum(n) {
    if (n === 1) return 1;
    if (n === 2) return 2;

    return fibsSum(n - 2) + fibsSum(n - 1) + 1;
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

    for (let i = start; i < end && i < this.length; i++) {
        newString += this[i];
    }

    return newString;
}

// Write a `String.prototype.realWordsInString(dictionary)` method, that returns
// an array containing the substrings of `string` that appear in `dictionary`.
// sorted alphabetically. This method does NOT return any duplicates.

String.prototype.realWordsInString = function(dictionary) {
    let substrings = [];

    dictionary.forEach((word) => {
        if (this.includes(word) && !substrings.includes(word)) {
            substrings.push(word);
        }
    })

    return substrings.sort();
}

// Write an `Array.prototype.myEach(callback)` method that invokes a callback
// for every element in an array and returns undefined. Do NOT use the built-in
// `Array.prototype.forEach`.

Array.prototype.myEach = function(callback) {
    for (let i = 0; i < this.length; i++) {
        callback(this[i]);
    }
}

// Write an `Array.prototype.myEvery(callback)` method that returns true 
// if the callback returns true for every element in the array, and otherwise 
// returns false. Use the `Array.prototype.myEach` method you defined above. Do 
// NOT call the built-in `Array.prototype.every` or `Array.prototype.forEach` 
// methods.

Array.prototype.myEvery = function(callback) {
    let every = true;

    this.myEach((ele) => {
        if (!callback(ele)) every = false;
    })

    return every;
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
    if (this.length < 2) return this;

    callback ||= function(a, b) {
        return Math.sign(a - b);
    }

    const center = Math.floor(this.length / 2);
    const left = this.slice(0, center).mergeSort(callback);
    const right = this.slice(center).mergeSort(callback);

    return merge(left, right, callback);
}

function merge(left, right, comparator) {
    let merged = [];

    while (left.length > 0 && right.length > 0) {
        if (comparator(left[0], right[0]) === -1) {
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
    function Surrogate() {}
    Surrogate.prototype = ParentClass.prototype;
    this.prototype = new Surrogate();
    this.prototype.constructor = this;
}

// Write a `Function.prototype.myBind(context)` method. It should return a copy
// of the original function, where `this` is set to `context`. It should allow 
// arguments to the function to be passed both at bind-time and call-time.
// Note that you are NOT allowed to use ES6 arrow syntax for this problem.

Function.prototype.myBind = function(context, ...bindArgs) {
    const that = this;

    return function(...callArgs) {
        return that.apply(context, bindArgs.concat(callArgs));
    }
}

// Write a `Function.prototype.myApply(context, argsArr)` method that accepts an
// object and an array of additional arguments. It should call the function with 
// the passed-in object as `this`, also passing the arguments array. Do NOT use 
// the built-in `Function.prototype.apply` or `Function.prototype.call` methods
// in your implementation.

Function.prototype.myApply = function(context, args = []) {
    return this.bind(context)(...args);
}