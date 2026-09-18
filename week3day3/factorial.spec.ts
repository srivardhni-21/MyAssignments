import { test } from "@playwright/test";

// Factorial test
test("Factorial", async () => {

// Number to find factorial
var num = 5;

// Initialize factorial value
var factorial = 1;

// Calculate factorial using for loop
for (var i = 1; i <= num; i++) {
factorial = factorial * i;
}

// Print the factorial result
console.log(factorial);
});
