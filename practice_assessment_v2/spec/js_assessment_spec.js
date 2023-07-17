describe('fibsSum', () => {
  it('returns the sum of the first fibonacci number', () => {
    expect(fibsSum(1)).toEqual(1);
  });

  it('returns the sum of the first 2 fibonacci numbers', () => {
    expect(fibsSum(2)).toEqual(2);
  });

  it('returns the sum of the first 6 fibonacci numbers', () => {
    expect(fibsSum(6)).toEqual(20);
  });

  it("calls itself recursively", () => {
    spyOn(window, "fibsSum").and.callThrough();
    fibsSum(6);
    expect(fibsSum.calls.count()).not.toBeLessThan(5);
  });
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

describe("String.prototype.realWordsInString", () => {
  it("finds a simple word", () => {
    const words = "asdfcatqwer".realWordsInString(["cat", "car"]);
    expect(words).toEqual(["cat"]);
  });

  it("doesn't find words not in the dictionary", () => {
    const words = "batcabtarbrat".realWordsInString(["cat", "car"]);
    expect(words).toEqual([]);
  });

  it("does not return duplicates", () => {
    const words = "catcarcat".realWordsInString(["cat", "car"]);
    expect(words).toEqual(["car", "cat"])
  });

  it("finds words at the end of the string", () => {
    const words = "cabcarcat".realWordsInString(["cat", "car", "cab"]);
    expect(words).toEqual(["cab", "car", "cat"]);
  });

  it("finds words within words", () => {
    const dictionary = ["bears", "ear", "a", "army"];
    const words = "erbearsweatmyajs".realWordsInString(dictionary);
    expect(words).toEqual(["a", "bears", "ear"]);
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

describe('Array.prototype.myEvery', () => {
  let arr;
  const spy = {
    callback: x => x % 2 === 0
  }

  beforeEach(() => {
    arr = [2, 4, 6];
    spyOn(Array.prototype, 'forEach').and.callThrough();
    spyOn(Array.prototype, 'every').and.callThrough();
  });

  afterEach(() => {
    expect(Array.prototype.forEach).not.toHaveBeenCalled();
    expect(Array.prototype.every).not.toHaveBeenCalled();
  });

  it("returns true if all elements match the block", () => {
    expect(arr.myEvery(spy.callback)).toBe(true);
  });

  it("returns false if not all elements match the block", () => {
    const callback = x => x % 3 === 0;
    expect(arr.myEvery(callback)).toBe(false);
  });

  it("calls the Array.prototype.myEach method", () => {
    spyOn(arr, "myEach");
    arr.myEvery(spy.callback);
    expect(arr.myEach).toHaveBeenCalled();
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

describe("Function.prototype.myBind", () => {
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
    expect(Function.prototype.myBind.toString().includes("=>"))
      .toBeFalsy('Fat arrow function not allowed (this spec will fail even if it is commented out)');  
  });
  
  it("sets the context and returns a function which can be called function style", () => {
    spyOn(Cat.prototype.sayHello, 'bind');
    expect(sally.sayHello.myBind(sally)()).toEqual("Sally says hello!");
    expect(Cat.prototype.sayHello.bind).not.toHaveBeenCalled();
  });

  it("should pass in bind-time argument to the method", () => {
    spyOn(Cat.prototype.greetOne, 'bind');
    expect(sally.greetOne.myBind(sally, markov)())
      .toEqual("Sally says hello to Markov");
    expect(Cat.prototype.greetOne.bind).not.toHaveBeenCalled();
  });

  it("should pass in two bind-time arguments to the method", () => {
    spyOn(Cat.prototype.greetTwo, 'bind');
    expect(sally.greetTwo.myBind(sally, markov, curie)())
      .toEqual("Sally says hello to Markov and Curie");
    expect(Cat.prototype.greetTwo.bind).not.toHaveBeenCalled();
  });

  it("takes multiple call-time arguments", () => {
    spyOn(Cat.prototype.greetTwo, 'bind');
    expect(sally.greetTwo.myBind(sally)(markov, curie))
      .toEqual("Sally says hello to Markov and Curie");
    expect(Cat.prototype.greetTwo.bind).not.toHaveBeenCalled();
  });

  it("should combine bind-time and call-time arguments", () => {
    spyOn(Cat.prototype.greetTwo, 'bind');
    expect(sally.greetTwo.myBind(sally, markov)(curie))
      .toEqual("Sally says hello to Markov and Curie");
    expect(Cat.prototype.greetTwo.bind).not.toHaveBeenCalled();
  });

  it("doesn't pass the call-time arguments to future calls", () => {
    spyOn(Cat.prototype.greetOne, 'bind');
    const boundFn = sally.greetOne.myBind(sally);
    expect(boundFn(markov)).toEqual("Sally says hello to Markov");
    expect(boundFn(curie)).toEqual("Sally says hello to Curie");
    expect(Cat.prototype.greetOne.bind).not.toHaveBeenCalled();
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

