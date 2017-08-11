const ReportSummary = {
  specs: 1,
  failed: 0
};

function describe(title, func = () => {}, level = 1000) {
  ReportSummary.specs++;


  console.log(title);
  func();

  if (level === 0) {
    console.log(`${ReportSummary.specs} specs, ${ReportSummary.failed} failures`);
  }
}

function beforeEach(func) {
  func();
}

function beforeAll(func) {
  func();
}

function it(title, func) {
  const GREEN = '\x1b[32m';
  const RESET = '\x1b[0m';
  const RED = '\x1b[31m';

  try {
    func();
    console.log(GREEN, `\t${title}`, RESET);
  } catch(e) {
    ReportSummary.failed++;

    console.log(RED, `\t${title}`, RESET);
    console.log(RED, e.message, RESET);
  }
}

class ExpectationError extends Error {}

function error(message) {
  throw new ExpectationError(message);
}

function expect(expected) {
  function toEqual(actual) {
    if (expected !== actual) {
      error(`\tExpected: '${expected}'. Actual: '${actual}'`);
    }
  }

  return {
    toEqual : toEqual
  }
}

describe('fizz buzz tests', () => {
  describe('fizzbuzz of number', () => {
    it('should be number', () => {
      expect(fizzbuzz(1)).toEqual(1);
      expect(fizzbuzz(2)).toEqual(2);
    });
  });

  describe('multiple of 3', () => {
    it('should be fizz', () => {
      expect(fizzbuzz(3)).toEqual("fizz");
      expect(fizzbuzz(6)).toEqual("fizz");
      expect(fizzbuzz(9)).toEqual("fizz");
    });
  });

  describe('multiple of 5', () => {
    it('should be buzz', () => {
      expect(fizzbuzz(5)).toEqual("buzz");
    });
  });

  describe('test beforeAll', () => {
    let wasCalled = false;
    beforeAll(() => {
      wasCalled = true;
    });

    it('should be called', () => {
      expect(wasCalled).toEqual(true);
    });

}, level = 0);


function fizzbuzz(num) {
  if (num % 3 === 0)
    return "fizz";
  if (num % 5 === 0)
    return "buzz";
  return num;
}

