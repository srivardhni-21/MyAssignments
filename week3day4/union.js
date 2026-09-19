//Type Union
function makePayment(method) {
    if (method === "UPI") {
        console.log("Payment method chosen:", method);
    }
    else if (method === "CreditCard") {
        console.log("Payment method chosen:", method);
    }
    else {
        console.log("Payment method chosen:", method);
    }
}
makePayment("UPI");
makePayment("CreditCard");
//makePayment("Cash")
