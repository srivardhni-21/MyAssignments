// Function to reverse a string
function reverseString(str) {

// Convert string into characters
let characters = str.split("");

// Store the reversed string
let reversed = "";

// Loop through the characters in reverse direction
for (let i = characters.length - 1; i >= 0; i--) {
reversed = reversed + characters[i];
}

// Print the reversed string
console.log("Reversed String:", reversed);

return reversed;
}


// Function to check whether the string is a palindrome
function isPalindrome(str) {

// Call reverseString function
let reversed = reverseString(str);

// Compare original and reversed string
if (str === reversed) {
return true;
} else {
return false;
}
}


// Test the function
let string1 = "madam";
//let string1='hello';  

console.log("Original String:", string1);
console.log("Is Palindrome:", isPalindrome(string1));
 