const PaymentStrategy = require("./PaymentStrategy");


// Concrete payment strategies
class CreditCardPayment extends PaymentStrategy {
    processPayment(amount) {
        console.log("Validating credit card...");
        console.log(`Processing credit card payment of $${amount}`);
        console.log("Sending credit card receipt...");
        console.log(`Credit card processing fee: $${this.calculateFee(amount)}`);
    }

    calculateFee(amount) {
        return amount * 0.02; // 2% fee
    }
}

class WireTransferPayment extends PaymentStrategy {
    processPayment(amount) {
        console.log("Redirecting to Wire Transfer...");
        console.log(`Processing payment of $${amount}`);
        console.log("Waiting for bank confirmation...");
        console.log(`Transfer processing fee: $${this.calculateFee(amount)}`);
    }

    calculateFee(amount) {
        return amount * 0.015; // 1.5% fee
    }
}

class BankTransferPayment extends PaymentStrategy {
    processPayment(amount) {
        console.log("Initiating bank transfer...");
        console.log(`Processing bank transfer of $${amount}`);
        console.log("Waiting for bank confirmation...");
        console.log(`Bank transfer fee: $${this.calculateFee(amount)}`);
    }

    calculateFee(amount) {
        return 10.0; // Flat fee
    }
}

// Export all classes at once
module.exports = {
    CreditCardPayment,
    WireTransferPayment,
    BankTransferPayment,
};