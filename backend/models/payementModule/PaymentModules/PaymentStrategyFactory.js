const { CreditCardPayment, WireTransferPayment, BankTransferPayment } = require("./PaymentStrategies");


// Strategy provider (Factory)
class PaymentStrategyFactory {
    static getPaymentStrategy(paymentMethod) {
        switch (paymentMethod.toUpperCase()) {
            case "CREDIT_CARD":
                return new CreditCardPayment();
            case "WIRE_TRANSFER":
                return new WireTransferPayment();
            case "BANK_TRANSFER":
                return new BankTransferPayment();
            default:
                throw new Error("Unknown payment method");
        }
    }
}


module.exports = PaymentStrategyFactory;