function fibonacci(n: number): number {

var a = 0;
var b = 1;

if (n === 0) {
return a;
}

for (var i = 2; i <= n; i++) {
var next = a + b;
a = b;
b = next;
}

return b;
}

console.log("Fibonacci(0):", fibonacci(0));
console.log("Fibonacci(1):", fibonacci(1));
console.log("Fibonacci(5):", fibonacci(5));
console.log("Fibonacci(7):", fibonacci(7));
console.log("Fibonacci(10):", fibonacci(10));
