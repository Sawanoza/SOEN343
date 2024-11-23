class QuotationContext {
    constructor(QuotationStrategy) {
        this.QuotationStrategy = QuotationStrategy;
    }

    setPaymentStrategy(QuotationStrategy) {
        this.QuotationStrategy = QuotationStrategy;
    }

    calculateQuotation(amount, weight, distance){    
        let cost = this.QuotationStrategy.calculateProfitPercentage(amount,weight,distance);
    }

}

module.exports = QuotationContext;
