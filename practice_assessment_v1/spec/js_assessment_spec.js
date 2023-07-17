describe("deepDup", () => {
  const robotParts = [
    ["nuts", "bolts", "washers"],
    ["capacitors", "resistors", "inductors"]
  ];
  let copy;

  beforeEach(() => {
    copy = deepDup(robotParts);
  });

  it("makes a copy of the original array", () => {
    expect(copy).toEqual(robotParts);
    expect(copy).not.toBe(robotParts);
  });

  it("deeply copies arrays", () => {
    copy[1].push("LEDs");
    expect(robotParts[1]).toEqual(["capacitors", "resistors", "inductors"]);
    expect(copy[1]).not.toBe(robotParts[1]);
  });

  it("calls itself recursively", () => {
    spyOn(window, "deepDup").and.callThrough();
    deepDup(robotParts);
    expect(deepDup).toHaveBeenCalledTimes(3);
  })
});

describe("String.prototype.mySlice", () => {
  beforeEach(() => {
    spyOn(String.prototype, 'slice').and.callThrough();
    spyOn(String.prototype, 'substring').and.callThrough();
    spyOn(String.prototype, 'substr').and.callThrough();
  });

  afterEach(() => {
    expect(String.prototype.slice).not.toHaveBeenCalled();
    expect(String.prototype.substring).not.toHaveBeenCalled();
    expect(String.prototype.substr).not.toHaveBeenCalled();
  });

  it("slices the string from the start index to the end index", () => {
    expect("abcd".mySlice(0, 2)).toEqual("ab");
  });

  it("slices to the end of the string when no second argument is passed", () => {
    expect("foobar".mySlice(3)).toEqual("bar");
  });

  it("returns an empty string when the first argument is higher", () => {
    expect("empty!".mySlice(1, 0)).toEqual("");
  });

  it("slices to the end of the string when the end index is greater than the string's length", () => {
    expect("super long string".mySlice(0, 200)).toEqual("super long string");
  });
});

describe('anagrams', () => {
  beforeEach(() => {
    spyOn(Array.prototype, 'sort').and.callThrough();
  });

  afterEach(() => {
    expect(Array.prototype.sort).not.toHaveBeenCalled();
  });
  
  it('returns true if words are anagrams', () => {
    expect(anagrams('abc', 'cba')).toBe(true);
  });

  it('returns false if words are not anagrams', () => {
    expect(anagrams('abc', 'aba')).toBe(false);
  });

  it('does not count words with same letters but varying lengths as anagrams', () => {
    expect(anagrams('abc', 'cbaa')).toBe(false);
  });

  it('can handle large words with letters extremely scrambled', () => {
    expect(anagrams('aiuwehfxzxcvmneowieurahsde', 'nsewceaerihfawzueouxdihmxv')).toBe(true);
    expect(anagrams('aiuwehfxzxcvmneowieurahsde', 'nsewceaerihfawzueouxdihmxw')).toBe(false);
  });
});

describe("Array.prototype.myEach", () => {
  let originalArray;
  let testArray;
  let result;
  const spy = {
    callback: (el) => { return el + 1; }
  };

  beforeEach(() => {
    spyOn(Array.prototype, 'forEach').and.callThrough();
  });

  afterEach(() => {
    expect(Array.prototype.forEach).not.toHaveBeenCalled();
  });

  it("calls the callback passed to it", () => {
    spyOn(spy, "callback");
    [1, 2, 3].myEach(spy.callback);
    expect(spy.callback).toHaveBeenCalled();
  });

  it("yields each element to the callback and has no return value", () => {
    spyOn(spy, "callback");
    result = [1, 2].myEach(spy.callback);
    expect(spy.callback).toHaveBeenCalledWith(1);
    expect(spy.callback).toHaveBeenCalledWith(2);
    expect(result).toBeUndefined();
  });

  it("does not modify the original array", () => {
    originalArray = ["original array"];
    testArray = ["original array"];
    testArray.myEach(spy.callback);
    expect(testArray).toEqual(originalArray);
  });
});

describe('Array.prototype.myFilter', () => {
  let originalArray;
  const spy = {
    callback: (el) => { return true }
  }

  // it does not call forEach or filter (setup)
  beforeEach(() => {
    spyOn(Array.prototype, 'forEach').and.callThrough();
    spyOn(Array.prototype, 'filter').and.callThrough();
  });

  // it does not call forEach or filter (verification)
  afterEach(() => {
    expect(Array.prototype.forEach).not.toHaveBeenCalled();
    expect(Array.prototype.filter).not.toHaveBeenCalled();
  });

  const isEven = function (num) { return num % 2 === 0; };

  const isLessThanThree = function (num) { return num < 3; };

  it("calls the callback passed to it", () => {
    spyOn(spy, "callback");
    [1, 2, 3].myFilter(spy.callback);
    expect(spy.callback).toHaveBeenCalled();
  });

  it("yields each element to the callback", () => {
    spyOn(spy, "callback");
    [1, 2, 3].myFilter(spy.callback);
    expect(spy.callback).toHaveBeenCalledWith(1);
    expect(spy.callback).toHaveBeenCalledWith(2);
    expect(spy.callback).toHaveBeenCalledWith(3);
  });

  it("calls the Array.prototype.myEach method", () => {
    originalArray = [1, 2, 3];
    spyOn(originalArray, "myEach");
    originalArray.myFilter(spy.callback);
    expect(originalArray.myEach).toHaveBeenCalled();
  });

  it("returns an array of filtered items", () => {
    const testArray = [1, 2, 3, 4, 5];
    expect(testArray.myFilter(isEven)).toEqual([2, 4]);
    expect(testArray.myFilter(isLessThanThree)).toEqual([1, 2]);
  });

  it("does not modify the original array", () => {
    originalArray = [1, 2, 3];
    originalArray.myFilter(isEven);
    expect(originalArray).toEqual([1, 2, 3]);
  });
});

describe("Array.prototype.mergeSort", () => {
  let array;

  beforeEach(() => {
    array = [1, 5, 2, 4, 3];
    spyOn(Array.prototype, 'sort').and.callThrough();
  });

  afterEach(() => {
    expect(Array.prototype.sort).not.toHaveBeenCalled();
  });

  it("works with an empty array", () => {
    expect([].mergeSort()).toEqual([]);
  });

  it("works with an array of one item", () => {
    expect([1].mergeSort()).toEqual([1]);
  });

  it("sorts numbers", () => {
    const sortedArray = [1, 2, 3, 4, 5];
    expect(array.mergeSort()).toEqual(sortedArray);
  });

  it("sorts arrays with duplicates", () => {
    expect([5, 4, 3, 3, 2, 1].mergeSort()).toEqual([1, 2, 3, 3, 4, 5]);
  });

  it("uses a comparator function if passed in", () => {
    const reversed = array.mergeSort((x, y) => {
      if (x === y) {
        return 0;
      } else if (x < y) {
        return 1;
      } else {
        return -1;
      }
    });
    expect(reversed).toEqual([5, 4, 3, 2, 1]);
  });

  it("does not modify original", () => {
    const dupedArray = [1, 5, 2, 4, 3];
    dupedArray.mergeSort();
    expect(dupedArray).toEqual(array);
  });

  it("calls the merge helper method", () => {
    spyOn(window, 'merge');
    array.mergeSort();
    expect(merge).toHaveBeenCalled();
  });
});

describe("Function.prototype.inherits", () => {
  let Animal;
  let Dog;
  let dog;

  beforeEach(() => {
    spyOn(Object, 'create').and.callThrough();
    spyOn(Object, 'assign').and.callThrough();
    spyOn(Object, 'setPrototypeOf').and.callThrough();
    
    Animal = function() {
      this.name = "Yogi";
    };

    Animal.prototype.makeNoise = function() { return "Hi!"; };

    Dog = function() {
      this.age = 7;
    };

    Dog.inherits(Animal);
    Dog.prototype.bark = function() { return "Woof!"; };
    dog = new Dog();
  });

  afterEach(() => {
    expect(Object.create).not.toHaveBeenCalled();
    expect(Object.assign).not.toHaveBeenCalled();
    expect(Object.setPrototypeOf).not.toHaveBeenCalled();
    expect(Function.prototype.inherits.toString().includes("__proto__"))
      .toBeFalsy('Do not modify the __proto__ property directly (this spec will fail even if it is commented out)');  
  });

  it("should properly set up the prototype chain between a child and parent", () => {
    expect(dog.bark()).toBe("Woof!");
    expect(dog.makeNoise()).toBe("Hi!");
  });

  it("should not call the parent's constructor function", () => {
    expect(dog.name).toBeUndefined();
  });

  it("should maintain separation of parent and child prototypes", () => {
    Dog.prototype.someProperty = 42;
    const animal = new Animal();
    expect(animal.someProperty).toBeUndefined();
    expect(animal.makeNoise()).toBe("Hi!");
  });

  it("should properly work for longer inheritance chains", () => {
    const Poodle = function () { this.name = "Bill"; };
    Poodle.inherits(Dog);
    Poodle.prototype.shave = function() { return "Brrr."; };
    const poodle = new Poodle();
    
    expect(poodle.name).toBe("Bill");
    expect(poodle.shave()).toBe("Brrr.");
    expect(poodle.makeNoise()).toBe("Hi!");
    expect(poodle.bark()).toBe("Woof!");
  });

  it("should set the child's constructor function back to the child", () => {
    expect(dog.constructor.name).toBe("Dog");
  });
});

describe("Function.prototype.myCurry", () => {
  it("if numArgs is 1, should call function first time the curried function is invoked with an argument", () => {
    const echo = function (arg) {
      return arg;
    };

    const first = echo.myCurry(1);
    expect(first("one")).toMatch(/one/);
  });

  it("curries arguments and calls function after called with total num args", () => {
    const dubs = function (a, b, c) {
      return (a + b + c) * 2;
    };

    const curriedSum = dubs.myCurry(3);
    const result = curriedSum(1)(2)(3);
    expect(result).toEqual(12);
  });

  it("should return itself if there are too few arguments", () => {
    const threeSum = function (x, y, z) {
      return x + y + z;
    };

    const myCurryResult = threeSum.myCurry(3)(1)(2);
    expect(myCurryResult).not.toEqual(6);
    expect(typeof (myCurryResult)).toEqual("function");
  });
});

describe("Function.prototype.myApply", () => {
  let Cat;
  let sally, markov, curie;

  beforeEach(() => {
    Cat = function Cat(name) {
      this.name = name;
    };

    Cat.prototype.sayHello = function () {
      return this.name + " says hello!";
    };

    Cat.prototype.greetOne = function (otherCat) {
      return this.name + " says hello to " + otherCat.name;
    };

    Cat.prototype.greetTwo = function (otherCat1, otherCat2) {
      return this.name + " says hello to " + otherCat1.name + " and " +
        otherCat2.name;
    };

    sally = new Cat("Sally");
    markov = new Cat("Markov");
    curie = new Cat("Curie");
  });

  afterEach(() => {
    const stringifiedFn = Function.prototype.myApply.toString();
    expect(stringifiedFn.includes("call"))
      .toBeFalsy('Function.prototype.call not allowed (spec will fail even if it is commented out)');
    expect(stringifiedFn.includes("apply"))
      .toBeFalsy('Function.prototype.apply not allowed (spec will fail even if it is commented out)');
  });

  it("invokes the function it is called on", () => {
    expect(sally.greetOne.myApply(sally, [markov])).toEqual("Sally says hello to Markov");
  });

  it("can take any number of arguments", () => {
    expect(sally.greetTwo.myApply(sally, [markov, curie]))
      .toEqual("Sally says hello to Markov and Curie");
  });

  it("should call the function method style on the context", () => {
    expect(sally.sayHello.myApply(markov)).toEqual("Markov says hello!");
  });
});

