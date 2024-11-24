
// Context class
class Checkout {
    constructor(amount) {
        this.amount = amount;
        this.paymentStrategy = null;
    }

    setPaymentStrategy(strategy) {
        this.paymentStrategy = strategy;
    }

    processPayment() {
        if (!this.paymentStrategy) {
            throw new Error("Payment strategy not set");
        }
        this.paymentStrategy.processPayment(this.amount);
    }

    getTotal() {
        if (!this.paymentStrategy) {
            throw new Error("Payment strategy not set");
        }
        return this.amount + this.paymentStrategy.calculateFee(this.amount);
    }
}


module.exports = Checkout;
