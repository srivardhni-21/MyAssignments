// Interface

interface Payment {

pay(amount: number): void

}


// UPI class

class UPI implements Payment {

pay(amount: number): void {

console.log("Payment of " + amount + " made through UPI")

}

}


// Credit Card class

class CreditCard implements Payment {

pay(amount: number): void {

console.log("Payment of " + amount + " made through Credit Card")

}

}


// Net Banking class

class NetBanking implements Payment {

pay(amount: number): void {

console.log("Payment of " + amount + " made through Net Banking")

}

}


// Create objects

let upi = new UPI()
upi.pay(1000)

let creditCard = new CreditCard()
creditCard.pay(2000)

let netBanking = new NetBanking()
netBanking.pay(3000)
