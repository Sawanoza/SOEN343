const Checkout = require('./Checkout');
const PaymentStrategyFactory = require('./PaymentStrategyFactory');

// Client code with Strategy Pattern
function main() {
    // Create a checkout for $100
    const checkout = new Checkout(100.0);

    // Process credit card payment
    checkout.setPaymentStrategy(PaymentStrategyFactory.getPaymentStrategy("CREDIT_CARD"));
    console.log(`Total with credit card: $${checkout.getTotal()}`);
    checkout.processPayment();

    console.log("\n-------------------\n");

    // Process wire transfer payment for the same checkout
    checkout.setPaymentStrategy(PaymentStrategyFactory.getPaymentStrategy("WIRE_TRANSFER"));
    console.log(`Total with Wire Transfer: $${checkout.getTotal()}`);
    checkout.processPayment();

    console.log("\n-------------------\n");

    // Process bank transfer payment with a different amount
    const bankCheckout = new Checkout(75.0);
    bankCheckout.setPaymentStrategy(PaymentStrategyFactory.getPaymentStrategy("BANK_TRANSFER"));
    console.log(`Total with Bank Transfer: $${bankCheckout.getTotal()}`);
    bankCheckout.processPayment();
}

// Run the client code
main();