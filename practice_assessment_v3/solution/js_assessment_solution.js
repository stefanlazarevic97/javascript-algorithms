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
    num = Math.floor(num/10);
  }

  return root;
}

// Alternate Solution
function digitalRoot(num) {
  const digits = [];

  while (num > 0) {
    digits.push(num % 10);
    num = Math.floor(num/10);
  }

  const digitSum = digits.reduce((sum, digit) => sum + digit);

  return digitSum > 10 ? digitalRoot(digitSum) : digitSum;
}

// Magical one - line solution
function digitalRoot(num) {
  return num < 10 ? num : digitalRoot(digitalRoot(Math.floor(num / 10)) + (num % 10));
}

// Write an `Array.prototype.dups` method that will return an object containing
// the indices of all duplicate elements. The keys are the duplicate elements; 
// the values are arrays of their indices in ascending order
//
// Example: 
// [1, 3, 4, 3, 0, 3, 0].dups => { 3: [1, 3, 5], 0: [4, 6] }
Array.prototype.dups = function() {
  const count = {};
  const dups = {};

  this.forEach( (el, idx) => {
    count[el] = count[el] || [];
    count[el].push(idx);
  });

  const keys = Object.keys(count).filter(el => count[el].length > 1);
  keys.forEach( (key) => {
    dups[key] = count[key];
  });

  return dups;
};

// Write a `String.prototype.realWordsInString(dictionary)` method, that returns
// an array containing the substrings of `string` that appear in `dictionary`.
// sorted alphabetically. This method does NOT return any duplicates.

// Solution 1
String.prototype.realWordsInString = function (dictionary) {
  const realWords = [];

  dictionary.forEach((el) => {
    if (this.includes(el)) realWords.push(el);
  });
  return realWords.sort();
};

// Solution 2
String.prototype.realWordsInString = function (dictionary) {
  const realWords = [];
  for (let i = 0; i < this.length; i++) {
    for (let j = i; j < this.length; j++) {
      let word = this.slice(i, j+1);

      if (dictionary.indexOf(word) > -1) {
        if (realWords.indexOf(word) < 0) realWords.push(word);
      }
    }
  }

  return realWords.sort();
};

// Write an `Array.prototype.myEach(callback)` method that invokes a callback
// for every element in an array and returns undefined. Do NOT use the built-in
// `Array.prototype.forEach`.
Array.prototype.myEach = function (func) {
  for (let i = 0; i < this.length; i++) {
    func(this[i]);
  }
};

// Write an `Array.prototype.mySome(callback)` method which takes a callback
// and returns true if the callback returns true for ANY element in the array. 
// Otherwise, return false. 
// Use the `Array.prototype.myEach` method you defined above. Do NOT call the
// built-in `Array.prototype.some` or `Array.prototype.forEach` methods.
Array.prototype.mySome = function (callback) {
  let some = false;

  this.myEach(el => {
    if (callback(el)) some = true;
  });

  return some;
};

// Write an `Array.prototype.bubbleSort(callback)` method, that bubble sorts an array.
// It should take an optional callback that compares two elements, returning
// -1 if the first element should appear before the second, 0 if they are
// equal, and 1 if the first element should appear after the second. Do NOT call
// the built-in Array.prototype.sort method in your implementation. Also, do NOT
// modify the original array.
//
// Here's a quick summary of the bubble sort algorithm:
//
// Iterate over the elements of the array. If the current element is unsorted
// with respect to the next element, swap them. If any swaps are made before
// reaching the end of the array, repeat the process. Otherwise, return the
// sorted array.
const defaultCallback = (num1, num2) => {
  if (num1 < num2) {
    return -1;
  } else if (num1 === num2) {
    return 0;
  } else {
    return 1;
  }
};

Array.prototype.bubbleSort = function (callback) {
  if (typeof callback !== "function") {
    callback = defaultCallback;
  }

  let resultArr = this.slice();
  let sorted = false;
  while (!sorted) {
    sorted = true;
    for (let i = 1, n = resultArr.length; i < n; i++) {
      if (callback(resultArr[i - 1], resultArr[i]) === 1) {
        sorted = false;
        let swap = resultArr[i - 1];
        resultArr[i - 1] = resultArr[i];
        resultArr[i] = swap;
      }
    }
  }
  return resultArr;
};

// Write a `Function.prototype.inherits(ParentClass)` method. It should extend
// the methods of `ParentClass.prototype` to `ChildClass.prototype`.
//
// **Do NOT use `Object.create`, `Object.assign`, `Object.setPrototypeOf`, or
// modify the `__proto__` property of any object directly.**
Function.prototype.inherits = function(Parent) {
  function Surrogate() {}
  Surrogate.prototype = Parent.prototype;
  this.prototype = new Surrogate();
  this.prototype.constructor = this;
};

// Write a `Function.prototype.myBind(context)` method. It should return a copy
// of the original function, where `this` is set to `context`. It should allow 
// arguments to the function to be passed both at bind-time and call-time.
// Note that you are NOT allowed to use ES6 arrow syntax for this problem.
Function.prototype.myBind = function (context, ...bindArgs) {
  const that = this;
  return function (...callArgs) {
    return that.apply(context, bindArgs.concat(callArgs));
  };
};

// Write a `Function.prototype.myCall(context)` method, that accepts an object,
// and any number of additional arguments. It should call the function with the
// passed-in object as `this`, also passing the remaining arguments. Do NOT use
// the built-in `Function.prototype.call` or `Function.prototype.apply` methods 
// in your implementation.
Function.prototype.myCall = function (context, ...args) {
  return this.bind(context)(...args);
};

// Also works (passing arguments at bind-time vs call-time)
Function.prototype.myCall = function (context, ...args) {
  return this.bind(context, ...args)();
};

