// Declare an array of numbers
let num = [56, 78, 90, 23, 90, 76, 43, 56];

// Outer loop to select each number
for (let i = 0; i < num.length; i++) {

// Inner loop to compare with the remaining numbers
for (let j = i + 1; j < num.length; j++) {

// Check if the numbers are equal
if (num[i] === num[j]) {

// Print the duplicate number
console.log(num[i]);
}
}
}
