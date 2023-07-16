// Write a function, `anagrams(str1, str2)`, that takes in two words and returns 
// a boolean indicating whether or not the words are anagrams. Anagrams are 
// words that contain the same characters but not necessarily in the same order. 
// Solve this without using Array.prototype.sort.
// 
// Examples:
// anagrams('listen', 'silent') => true
// anagrams('listen', 'potato') => false

function anagrams(str1, str2) {
    count = {};

    for (let char of str1) count[char] = (count[char] || 0) + 1;
    for (let char of str2) count[char] = (count[char] || 0) - 1;

    for (let char in count) {
        if (count[char] !== 0) return false;
    }

    return true;
}

// Write a function `titleize(str)` that capitalizes each word in a string like
// a book title. 
// Do not capitalize the following words (unless they are the first word in the 
// string): ["a", "and", "of", "over", "the"]

function titleize(str) {
    let smallWords = ["a", "and", "of", "over", "the"];
    let array = str.split(" ");

    let newArray = array.map((word, i) => {
        if (smallWords.includes(word) && i !== 0) {
            return word;
        } else {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }
    })

    return newArray.join(" ");
}

// Write a `String.prototype.symmetricSubstrings` method that returns an array
// of substrings which are palindromes in alphabetical order. Only include 
// substrings of length > 1.
// e.g. "cool".symmetricSubstrings() => ["oo"]

String.prototype.symmetricSubstrings = function() {
    let palindromes = [];

    for (i = 0; i < this.length; i++) {
        for (j = i + 1; j <= this.length; j++) {
            let substring;

            if (j > i) substring = this.slice(i, j);

            if (substring.length > 1 && substring === substring.split("").reverse().join("")) {
                palindromes.push(substring);
            }
        }   
    }
    
    return palindromes.sort();
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

// Write an `Array.prototype.bubbleSort(callback)` method, that bubble sorts an array.
// It should take an optional callback that compares two elements, returning
// -1 if the first element should appear before the second, 0 if they are
// equal, and 1 if the first element should appear after the second. Do NOT call
// the built-in `Array.prototype.sort` method in your implementation. Also, do NOT
// modify the original array.
//
// Here's a quick summary of the bubble sort algorithm:
//
// Iterate over the elements of the array. If the current element is unsorted
// with respect to the next element, swap them. If any swaps are made before
// reaching the end of the array, repeat the process. Otherwise, return the
// sorted array.

Array.prototype.bubbleSort = function(callback) {
    let array = this.slice();

    callback ||= function (a, b) {
        return Math.sign(a - b);
    }

    let sorted = false;

    while (!sorted) {
        sorted = true;
        
        for (let i = 0; i < array.length - 1; i++) {
            if (callback(array[i], array[i + 1]) === 1) {
                [array[i], array[i + 1]] = [array[i + 1], array[i]];
                sorted = false;
            }
        }
    }

    return array;
}

// Write a function `jumbleSort(string, alphabet)`.
// Jumble sort takes a string and an alphabet. It returns a copy of the string
// with the letters re-ordered according to their positions in the alphabet. If
// no alphabet is passed in, it defaults to normal alphabetical order (a-z).
//
// The English alphabet, in order, is 'abcdefghijklmnopqrstuvwxyz'
//
// **Do NOT use the built-in `Array.prototype.sort` in your implementation.**
//
// Example:
// jumbleSort("hello") => "ehllo"
// jumbleSort("hello", ['o', 'l', 'h', 'e']) => 'ollhe'

function jumbleSort(string, alphabet = null) {
    alphabet ||= 'abcdefghijklmnopqrstuvwxyz'.split('');
    string = string.split('');
    let sorted = false;

    while (!sorted) {
        sorted = true;
        
        for (let i = 0; i < string.length - 1; i++) {
            if (alphabet.indexOf(string[i]) > alphabet.indexOf(string[i + 1])) {
                [string[i], string[i + 1]] = [string[i + 1], string[i]];
                sorted = false;
            }
        }
    }

    return string.join("");
}

// Write an `Array.prototype.quickSort(callback)` method that quick sorts an array. 
// It should take an optional callback that compares two elements, returning -1 
// if the first element should appear before the second, 0 if they are equal, and
// 1 if the first element should appear after the second. Do NOT call the 
// built-in Array.prototype.sort method in your implementation.
//
// Here's a summary of the quick sort algorithm:
//
// Choose a pivot element, then iterate over the rest of the array, moving the 
// remaining elements on to the appropriate side of the pivot. Recursively quick 
// sort each side of the array until a base case is reached. 

Array.prototype.quickSort = function(callback) {
    callback ||= function(a, b) {
        return Math.sign(a - b);
    }

    if (this.length < 2) return this;

    let pivot = this[0];
    let left = this.slice(1).filter((ele) => callback(ele, pivot) === -1);
    let right = this.slice(1).filter((ele) => callback(ele, pivot) !== -1);
    return left.quickSort(callback).concat(pivot, right.quickSort(callback));
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

// Write a recursive function, `binarySearch(sortedArray, target)`, that returns
// the index of `target` in `sortedArray`, or -1 if it is not found. Do NOT use
// the built-in `Array.prototype.indexOf` or `Array.prototype.includes` methods 
// in your implementation.
//
// Here's a quick summary of the binary search algorithm:
//
// Start by looking at the middle item of the array. If it matches the target,
// return its index. Otherwise, recursively search either the left or the right
// half of the array until the target is found or the base case (empty array) is
// reached.

function binarySearch(array, target) {
    const center = Math.floor(array.length / 2);
    if (array.length === 0) return -1;
    if (array[center] === target) return center;

    if (array[center] > target) {
        return binarySearch(array.slice(0, center), target);
    } else {
        const rec = binarySearch(array.slice(center + 1), target);
        return rec === -1 ? -1 : rec + center + 1;
    }
}

// Write a function `firstEvenNumbersSum(n)` that returns the sum of the
// first n even numbers recursively. Assume n > 0

function firstEvenNumbersSum(n) {
    if (n === 1) return 2;
    return 2 * n + firstEvenNumbersSum(n - 1);
}

// Write a function, `exponent(b, n)`, that calculates b^n recursively. 
// Your solution should accept negative values for n. Do NOT use ** or Math.pow

function exponent(b, n) {
    if (n === 0) return 1;

    if (n > 0) {
        return b * exponent(b, n - 1);
    } else {
        return 1 / b * exponent(b, n + 1);
    }
}

// Write a recursive function `recSum(numArr)` that returns the sum of all
// elements in an array. Assume all elements are numbers.

function recSum(array) {
    if (array.length === 0) return 0;
    return array[0] + recSum(array.slice(1));
}

// Write a function, `deepDup(arr)`, that will perform a "deep" duplication of
// the array and any interior arrays. A deep duplication means that the array 
// itself, as well as any nested arrays (no matter how deeply nested) are duped 
// and are completely different objects in memory than those in the original 
// array.

function deepDup(array) {
    return array.map((ele) => ele instanceof Array ? deepDup(ele) : ele);
}

// Write a recursive function, `factorialsRec(num)`, that returns the first 
// `num` factorial numbers. Note that the 1st factorial number is 0!, which 
// equals 1. The 2nd factorial is 1!, the 3rd factorial is 2!, etc.

function factorialsRec(num) {
    if (num === 0 || num === 1) return [1];

    const facts = factorialsRec(num - 1);
    facts.push(facts[facts.length - 1] * (num - 1));
    return facts;
}

// Write a recursive function `stringIncludeKey(string, key)` that takes in 
// a string to search and a key string. Return true if the string contains all 
// of the characters in the key in the same order that they appear in the key.
//
// stringIncludeKey("cadbpc", "abc") => true
// stringIncludeKey("cba", "abc") => false

function stringIncludeKey(string, key) {
    if (key.length === 0) return true;

    let nextKeyChar = key[0];
    let keyIndex = string.indexOf(nextKeyChar);

    if (keyIndex < 0) return false; 
    return stringIncludeKey(string.slice(keyIndex + 1), key.slice(1));
}

// Write a function, `digitalRoot(num)`. It should sum the digits of a positive
// integer. If the result is greater than 9 (i.e. more than one digit), sum the 
// digits of the resulting number. Keep repeating until there is only one digit 
// in the result, called the "digital root". 
// **Do not use string conversion within your method.** 
// For further explanation on the digital root concept, refer here: https://en.wikipedia.org/wiki/Digital_root
//
// You may wish to use a helper function, `digitalRootStep(num)` which performs
// one step of the process.

function digitalRoot(num) {
    while (num >= 10) {
        num = digitalRootStep(num);
    }

    return num;
}

function digitalRootStep(num) {
    let root = 0;

    while (num > 0) {
        root += num % 10;
        num = Math.floor(num / 10);
    }
    
    return root;
}

// Write a function, `fibsSum(n)`, that finds the sum of the first n
// fibonacci numbers recursively. Assume n > 0.
// Note that for this problem, the fibonacci sequence starts with [1, 1]. 

function fibsSum(n) {
    if (n === 1) return 1;
    if (n === 2) return 2;

    return fibsSum(n - 2) + fibsSum(n - 1) + 1;
}

// Write an `Array.prototype.myRotate(times)` method which rotates the array by 
// the given argument. If no argument is given, rotate the array by one position. 
// ex.
// ["a", "b", "c", "d"].myRotate() => ["b", "c", "d", "a"]
// ["a", "b", "c", "d"].myRotate(2) => ["c", "d", "a", "b"]
// ["a", "b", "c", "d"].myRotate(-1) => ["d", "a", "b", "c"]

// Write an `Array.prototype.median` method that returns the median of elements
// in an array. If the length is even, return the average of the middle two 
// elements.

// Write a function `primes(num)`, which returns an array of the first "num" primes.
// You may wish to use an `isPrime(num)` helper function.

// Write an `Array.prototype.myJoin(separator)` method, which joins the elements
// of an array into a string. If an argument is provided to `myJoin`, use that
// between each element. Otherwise, use an empty string.
// Do NOT call the built-in `Array.prototype.join` method.
// ex.
// [1, 2, 3].myJoin() => '123'
// [1, 2, 3].myJoin('$') => '1$2$3'

// Write a function, `doubler(arr)`, that returns a copy of the input array 
// with all elements doubled. You do not need to worry about invalid input.
//
// Example:
// doubler([1, 2, 3]) => [2, 4, 6]

// Write an `Array.prototype.twoSum` method, that finds all pairs of positions 
// where the elements at those positions sum to zero.

// NB: ordering matters. Each pair must be sorted with the smaller index
// before bigger index. The array of pairs must be sorted
// "dictionary-wise":
// [0, 2] before [1, 2] (smaller first elements come first)
// [0, 1] before [0, 2] (then smaller second elements come first)

// Write a `String.prototype.mySlice(startIdx, endIdx)` method. It should take 
// a start index and an (optional) end index and return a new string. Do NOT 
// use the built-in string methods `slice`, `substr`, or `substring`. 
// ex. 
// `abcde`.mySlice(2) => `cde`
// `abcde`.mySlice(1, 3) => `bc`

// Write a function `myFind(array, callback)` that returns the first
// element for which the callback returns true. If none is found, the 
// function should return `undefined`
// Do not use the built-in `Array.prototype.find` method.

// Write a function `transpose(arr)` that returns a 2d array transposed.
// e.g. transpose([[1,2],[3,4],[5,6]]) => [[1,3,5],[2,4,6]]

// Write an `Array.prototype.dups` method that will return an object containing 
// the indices of all duplicate elements. The keys are the duplicate elements; 
// the values are arrays of their indices in ascending order
//
// Example: 
// [1, 3, 4, 3, 0, 3, 0].dups => { 3: [1, 3, 5], 0: [4, 6] }

// Write a function, `factors(num)`, that returns an array containing the factors
// of a number in ascending order.

// Write an `Array.prototype.myFlatten()` method which flattens a 
// multi-dimensional array into a one-dimensional array.
// Example:
// [["a"], "b", ["c", "d", ["e"]]].myFlatten() => ["a", "b", "c", "d", "e"]

// Write a function `myReverse(array)` which returns the array in reversed
// order. Do NOT use the built-in `Array.prototype.reverse`.
// ex. myReverse([1,2,3]) => [3,2,1]

// Write a `Function.prototype.myCurry(numArgs)` method that collects arguments 
// until the number of arguments collected is equal to the original `numArgs` 
// value and then invokes the curried function.

// Write a `Function.prototype.inherits(ParentClass)` method. It should extend
// the methods of `ParentClass.prototype` to `ChildClass.prototype`.
//
// **Do NOT use `Object.create`, `Object.assign`, `Object.setPrototypeOf`, or
// modify the `__proto__` property of any object directly.**

// Write a `Function.prototype.myCall(context)` method, that accepts an object, 
// and any number of additional arguments. It should call the function with the
// passed-in object as `this`, also passing the remaining arguments. Do NOT use
// the built-in `Function.prototype.call` or `Function.prototype.apply` methods 
// in your implementation.

// Write a `Function.prototype.myBind(context)` method. It should return a copy
// of the original function, where `this` is set to `context`. It should allow 
// arguments to the function to be passed both at bind-time and call-time.
// Note that you are NOT allowed to use ES6 arrow syntax for this problem.

// Write a `Function.prototype.myApply(context, argsArr)` method that accepts an
// object and an array of additional arguments. It should call the function with 
// the passed-in object as `this`, also passing the arguments array. Do NOT use 
// the built-in `Function.prototype.apply` or `Function.prototype.call` methods
// in your implementation.

// Write an `Array.prototype.myReduce(callback, acc)` method which takes a 
// callback and an optional argument of a default accumulator. If myReduce only 
// receives one argument, then use the first element of the array as the default 
// accumulator. Use the `Array.prototype.myEach` method you defined above. Do 
// NOT call in the built-in `Array.prototype.reduce` or `Array.prototype.forEach` 
// methods.

// Write an `Array.prototype.myEach(callback)` method that invokes a callback
// for every element in an array and returns undefined. Do NOT use the built-in
// `Array.prototype.forEach`.

// Write an `Array.prototype.mySome(callback)` method which takes a callback 
// and returns true if the callback returns true for ANY element in the array. 
// Otherwise, return false. 
// Use the `Array.prototype.myEach` method you defined above. Do NOT call the
// built-in `Array.prototype.some` or `Array.prototype.forEach` methods.

// Write an `Array.prototype.myFilter(callback)` that takes a callback and 
// returns a new array which includes every element for which the callback 
// returned true. Use the `Array.prototype.myEach` method you defined above. Do 
// NOT call the built-in `Array.prototype.filter` or `Array.prototype.forEach` 
// methods.

// Write an `Array.prototype.myEvery(callback)` method that returns true 
// if the callback returns true for every element in the array, and otherwise 
// returns false. Use the `Array.prototype.myEach` method you defined above. Do 
// NOT call the built-in `Array.prototype.every` or `Array.prototype.forEach` 
// methods.

// Write an `Array.prototype.myReject(callback)` method. Return a new array, 
// which contains only the elements for which the callback returns false. 
// Use the `Array.prototype.myEach` method you defined above. Do NOT call the 
// built-in `Array.prototype.filter` or `Array.prototype.forEach` methods.
// ex.
// [1,2,3].myReject( (el) => el > 2 ) => [1, 2]

