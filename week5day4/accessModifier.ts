class Calculator {

// public method
public add(a: number, b: number) {
return a + b;
}

// private method
private sub(a: number, b: number) {
return a - b;
}

// protected method
protected mul(a: number, b: number) {
return a * b;
}
}

// Create object
let cal = new Calculator();

// Public → accessible outside the class
console.log(cal.add(10, 5));

// Private → NOT accessible outside the class
// console.log(cal.sub(10, 5));

// Protected → NOT accessible outside the class
// console.log(cal.mul(10, 5));
