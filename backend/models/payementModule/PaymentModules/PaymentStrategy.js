// Payment Strategy Interface
class PaymentStrategy {
    processPayment(amount) {
        throw new Error("processPayment() must be implemented");
    }

    calculateFee(amount) {
        throw new Error("calculateFee() must be implemented");
    }
}

module.exports = PaymentStrategy;