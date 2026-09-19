//Type Union

//Type Alias -> used to create the custom type

type PaymentMethod = "UPI" | "CreditCard" | "PayPal"

function makePayment(method: PaymentMethod) {

if (method === "UPI") {

console.log("Payment method chosen:", method);

} else if (method === "CreditCard") {

console.log("Payment method chosen:", method);

} else {

console.log("Payment method chosen:", method);
}
}

makePayment("UPI")
makePayment("CreditCard")

//makePayment("Cash")
