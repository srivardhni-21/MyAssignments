// Abstraction

abstract class Wrapper {

// Implemented method
fill() {
console.log("Fill the text");
}

// Implemented method
clear() {
console.log("Clear the text");
}

// Unimplemented method
abstract locator(): void;

// Unimplemented method
abstract frame(): void;
}


// Concrete class

class Concrete extends Wrapper {

// Implementing abstract method
locator(): void {
console.log("Locate the element");
}

// Implementing abstract method
frame(): void {
console.log("Handle the frame");
}
}


// Object creation

let cn = new Concrete();

cn.fill();
cn.clear();
cn.locator();
cn.frame();
